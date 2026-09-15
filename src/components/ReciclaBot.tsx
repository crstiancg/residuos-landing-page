import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Sparkles, 
  CornerDownLeft,
  ChevronDown,
  Info
} from 'lucide-react';
import { 
  getReciclaBotAnswer, 
  BOT_PRESET_TOPICS, 
  BotAction 
} from '../data/reciclabotKnowledge';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: BotAction[];
  suggestedQuestions?: string[];
}

interface ReciclaBotProps {
  onScrollToSection?: (sectionId: string) => void;
}

export const ReciclaBot: React.FC<ReciclaBotProps> = ({ onScrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: '¡Hola, vecino(a)! 🤖 Soy ChatBot, tu asistente municipal del Módulo de Gestión Integral de Residuos Sólidos en Puno. Estoy aquí para orientarte sobre las 29 rutas de recolección, horarios de camiones, cómo separar tu basura, pedir tu compostera gratis o reportar botaderos. ♻️ ¿En qué puedo servirte hoy? 🌿',
      timestamp: 'Ahora',
      actions: [
        { label: 'Ver las 29 Rutas', targetSection: 'rutas' },
        { label: 'Segregación en Fuente', targetSection: 'segregacion' },
        { label: 'Compostaje Gratuito', targetSection: 'compostaje' }
      ],
      suggestedQuestions: [
        '¿A qué hora pasa el camión por mi casa?',
        '¿Cómo solicito una compostera gratis?',
        '¿Cuáles son las multas por tirar basura?'
      ]
    }
  ]);

  // Scroll to bottom whenever messages or typing state change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen, messages, isTyping]);

  // Text-to-speech functionality in Spanish
  const speakText = (text: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Remove emojis for cleaner speech
      const cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-PE';
      utterance.rate = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore TTS errors
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();
    if (!query) return;

    const userMessageId = `user-${Date.now()}`;
    const newMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural thinking delay (400-600ms)
    setTimeout(() => {
      const response = getReciclaBotAnswer(query);
      const botMessageId = `bot-${Date.now()}`;
      
      const botMsg: Message = {
        id: botMessageId,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: response.actions,
        suggestedQuestions: response.suggestedQuestions
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speakText(response.text);
    }, 550);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (targetSection: string) => {
    if (onScrollToSection) {
      onScrollToSection(targetSection);
    } else {
      const el = document.getElementById(targetSection);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReset = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'bot',
        text: '¡Conversación reiniciada! 🤖 Puedes consultarme sobre cualquier ruta de Puno, horarios de compactadores, segregación de residuos o inscribirte a compostaje. ♻️ ¿Cómo te ayudo?',
        timestamp: 'Ahora',
        actions: [
          { label: 'Ver las 29 Rutas', targetSection: 'rutas' },
          { label: 'Reporta a tu Vecino', targetSection: 'reporta' }
        ],
        suggestedQuestions: [
          '¿A qué hora pasa el camión?',
          '¿Cómo solicito una compostera gratis?',
          '¿Qué residuos van a la bolsa verde?'
        ]
      }
    ]);
  };

  return (
    <>
      {/* 1. FLOATING 60PX TRIGGER BUTTON (Positioned bottom-right of portada) */}
      <div 
        id="reciclabot-floating-container"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto"
      >
        {/* Tooltip on Hover */}
        <div 
          id="reciclabot-tooltip"
          role="tooltip"
          className={`mb-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-semibold shadow-xl border border-slate-700/60 backdrop-blur-md transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 pointer-events-none select-none ${
            showTooltip && !isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
          }`}
        >
          <span>🤖 ¡Pregúntame sobre Puno!</span>
          {/* Tooltip bottom indicator arrow */}
          <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-slate-900/95" />
        </div>

        {/* 60px Circular Icon */}
        <button
          id="reciclabot-trigger-btn"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowTooltip(false);
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label={isOpen ? 'Cerrar asistente ChatBot' : 'Abrir asistente virtual ChatBot'}
          aria-expanded={isOpen}
          title="🤖 ¡Pregúntame sobre Puno!"
          className="relative w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-full bg-[#0088CC] hover:bg-[#0077B5] text-white flex items-center justify-center shadow-lg shadow-[#0088CC]/35 hover:shadow-xl hover:shadow-[#0088CC]/45 transition-all duration-200 active:scale-95 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-[#0088CC]/40"
        >
          {/* Little Robot in White Center */}
          <div className="flex items-center justify-center transition-transform duration-200">
            {isOpen ? (
              <X className="w-7 h-7 text-white stroke-[2.4]" />
            ) : (
              <Bot className="w-7 h-7 text-white stroke-[2.2]" />
            )}
          </div>

          {/* Live Indicator (punto celeste parpadeante en esquina superior derecha) */}
          <span 
            className="absolute top-0.5 right-0.5 flex h-4 w-4 pointer-events-none" 
            title="ChatBot en línea"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-85" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0088CC] border-2 border-white shadow-xs" />
          </span>
        </button>
      </div>

      {/* 2. CHATBOT WINDOW DIALOG */}
      {isOpen && (
        <div 
          id="reciclabot-chat-window"
          role="dialog"
          aria-label="Ventana de chat de ChatBot"
          className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] max-w-[440px] h-[580px] max-h-[82vh] bg-white rounded-2xl shadow-2xl border border-black/10 flex flex-col z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-body"
        >
          {/* Header */}
          <div className="bg-[#2B2B5E] text-white px-4 py-3.5 flex items-center justify-between shadow-xs select-none">
            <div className="flex items-center gap-3">
              {/* Bot Avatar in Header */}
              <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-xs shrink-0">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0088CC] rounded-full border border-[#2B2B5E]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold leading-tight font-heading">ChatBot</h3>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-[#0088CC] text-white font-heading">
                    Muni Puno
                  </span>
                </div>
                <p className="text-[11px] text-white/80 flex items-center gap-1 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-pulse"></span>
                  <span>En línea • Asistente Municipal</span>
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Silenciar voz de ChatBot' : 'Activar voz de lectura'}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label={soundEnabled ? 'Silenciar voz' : 'Activar voz'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-sky-200" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={handleReset}
                title="Reiniciar chat"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Reiniciar conversación"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimizar ventana"
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                aria-label="Cerrar chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Presets Carousel / Badges */}
          <div className="bg-[#FFFFFF] border-b border-black/10 px-3 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#797F89] uppercase tracking-wider shrink-0 flex items-center gap-1 pl-1 font-heading">
              <Sparkles className="w-3 h-3 text-[#0088CC]" />
              Temas:
            </span>
            {BOT_PRESET_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSendMessage(topic.prompt)}
                className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium bg-white text-[#2B2B5E] border border-black/15 hover:border-[#0088CC] hover:text-[#0088CC] hover:bg-[#0088CC]/5 transition-all cursor-pointer whitespace-nowrap shadow-2xs font-body"
              >
                <span className="mr-1">{topic.icon}</span>
                <span>{topic.title}</span>
              </button>
            ))}
          </div>

          {/* Messages Conversation Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FFFFFF]">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1.5`}
                >
                  <div className={`flex items-end gap-2 max-w-[88%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Bot Avatar Icon */}
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-[#0088CC] text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isBot
                          ? 'bg-white text-[#000000] border border-black/10 rounded-bl-xs shadow-2xs font-body'
                          : 'bg-[#0088CC] text-white rounded-br-xs shadow-xs font-body'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>

                  {/* Optional Action Buttons attached to Bot response */}
                  {isBot && msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-9 pt-1">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act.targetSection)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0088CC]/10 text-[#0088CC] border border-[#0088CC]/20 hover:bg-[#0088CC]/20 transition-colors cursor-pointer font-heading"
                        >
                          <span>{act.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Suggested follow-up questions */}
                  {isBot && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                    <div className="flex flex-wrap gap-1 pl-9 pt-1">
                      {msg.suggestedQuestions.map((qText, qIdx) => (
                        <button
                          key={qIdx}
                          onClick={() => handleSendMessage(qText)}
                          className="text-[11px] text-[#2B2B5E] bg-white hover:bg-black/5 hover:text-[#0088CC] px-2.5 py-1 rounded-full border border-black/15 transition-colors cursor-pointer text-left font-body"
                        >
                          💬 {qText}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <span className={`text-[10px] text-[#797F89] ${isBot ? 'pl-9' : 'pr-2'} font-body`}>
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-[#0088CC] text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-black/10 px-3.5 py-2.5 rounded-2xl rounded-bl-xs shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0088CC] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Form Area */}
          <div className="p-3 bg-white border-t border-black/10">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu consulta o barrio (ej. Laykakota)..."
                className="flex-1 bg-white text-[#000000] placeholder:text-[#797F89] text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-black/15 focus:border-[#0088CC] focus:ring-2 focus:ring-[#0088CC]/20 focus:outline-hidden transition-all font-body"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-lg bg-[#0088CC] hover:bg-[#0077B5] disabled:bg-black/10 text-white disabled:text-[#797F89] flex items-center justify-center shrink-0 transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs active:scale-95"
                title="Enviar mensaje"
                aria-label="Enviar mensaje"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Micro disclaimer */}
            <div className="pt-2 flex items-center justify-between text-[10px] text-[#797F89] px-1 font-body">
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-[#0088CC]" />
                Muni Puno Digital • GGIRS
              </span>
              <span>Central: (051) 368-450</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
