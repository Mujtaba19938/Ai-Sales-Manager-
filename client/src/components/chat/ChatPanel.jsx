import { useState, useRef, useEffect } from 'react';
import { X, Send, Trash2, Bot, User, Sparkles, ArrowRight } from 'lucide-react';
import { useChat } from '../../hooks/useChat';

const SUGGESTIONS = [
  { icon: '📊', text: 'How are my sales performing?' },
  { icon: '🏆', text: 'What are my top categories?' },
  { icon: '💡', text: 'How can I reduce expenses?' },
];

export default function ChatPanel({ open, onClose }) {
  const { messages, sendMessage, isStreaming, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage(input.trim());
    setInput('');
  };

  return (
    <div style={{
      position: 'fixed', right: 0, top: 0, bottom: 0,
      width: 440, maxWidth: '100vw',
      background: 'var(--bg-primary)',
      borderLeft: '1px solid var(--border-color)',
      boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex', flexDirection: 'column',
      zIndex: 40,
    }}>
      {/* Header */}
      <div style={{
        padding: '18px 20px',
        background: '#0f172a',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'rgba(34,197,94,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Sparkles size={18} style={{ color: '#22c55e' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#ffffff' }}>AI Assistant</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>Powered by Claude</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button onClick={clearChat} title="Clear chat" style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', display: 'flex', padding: 8,
            borderRadius: 8, transition: 'all 0.15s',
          }}>
            <Trash2 size={15} />
          </button>
          <button onClick={onClose} title="Close" style={{
            background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', display: 'flex', padding: 8,
            borderRadius: 8, transition: 'all 0.15s',
          }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1, overflow: 'auto', padding: 20,
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Empty State */}
        {messages.length === 0 && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', flex: 1, padding: '20px 0',
          }}>
            {/* Animated icon */}
            <div style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(15,23,42,0.08))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20, border: '1px solid var(--border-color)',
            }}>
              <Sparkles size={32} style={{ color: '#22c55e' }} />
            </div>

            <h3 style={{
              fontSize: 18, fontWeight: 700, color: 'var(--text-primary)',
              marginBottom: 6, textAlign: 'center',
            }}>
              How can I help?
            </h3>
            <p style={{
              fontSize: 13, color: 'var(--text-secondary)',
              textAlign: 'center', maxWidth: 280, lineHeight: 1.6, marginBottom: 28,
            }}>
              I can analyze your sales data, identify trends, and give actionable insights.
            </p>

            {/* Suggestion cards */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s.text)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 16px', borderRadius: 14,
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)', color: 'var(--text-primary)',
                    cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    textAlign: 'left', transition: 'all 0.15s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#22c55e';
                    e.currentTarget.style.background = 'rgba(34,197,94,0.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }}
                >
                  <span style={{ fontSize: 18 }}>{s.icon}</span>
                  <span style={{ flex: 1 }}>{s.text}</span>
                  <ArrowRight size={14} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10,
            flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
          }}>
            {/* Avatar */}
            <div style={{
              width: 30, height: 30, borderRadius: 10,
              background: msg.role === 'user' ? '#0f172a' : 'rgba(34,197,94,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {msg.role === 'user'
                ? <User size={14} color="#fff" />
                : <Sparkles size={14} style={{ color: '#22c55e' }} />
              }
            </div>

            {/* Bubble */}
            <div style={{
              padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? '#0f172a' : 'var(--bg-card)',
              color: msg.role === 'user' ? '#ffffff' : 'var(--text-primary)',
              fontSize: 13, lineHeight: 1.7, maxWidth: '82%',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              border: msg.role === 'user' ? 'none' : '1px solid var(--border-color)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              {msg.content || (isStreaming && i === messages.length - 1 ? (
                <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.4s infinite' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.4s infinite 0.2s' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 1.4s infinite 0.4s' }} />
                </span>
              ) : '')}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} style={{
        padding: '16px 20px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
      }}>
        <div style={{
          display: 'flex', gap: 8, alignItems: 'center',
          padding: '6px 6px 6px 16px',
          borderRadius: 16, border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          transition: 'border-color 0.15s',
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about your business..."
            disabled={isStreaming}
            style={{
              flex: 1, padding: '8px 0', border: 'none',
              background: 'transparent', color: 'var(--text-primary)',
              fontSize: 13, outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            style={{
              width: 38, height: 38, borderRadius: 12,
              border: 'none',
              background: isStreaming || !input.trim() ? 'var(--bg-secondary)' : '#22c55e',
              color: isStreaming || !input.trim() ? 'var(--text-secondary)' : '#fff',
              cursor: isStreaming ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
