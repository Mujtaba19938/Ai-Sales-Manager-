import { useState, useCallback } from 'react';
import { chatStream } from '../api/client';
import { useDateRange } from '../context/DateRangeContext';
import { buildMessageContent } from '../utils/imageUtils';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const { dateRange } = useDateRange();

  const sendMessage = useCallback(async (text, images = []) => {
    const content = buildMessageContent(text, images);
    const userMsg = {
      role: 'user',
      content,
      _imagePreviewUrls: images.map(img => img.previewUrl),
    };
    const history = [...messages, userMsg];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setIsStreaming(true);

    // Strip client-only fields before sending to API
    const apiMessages = history.map(({ _imagePreviewUrls, ...msg }) => msg);

    try {
      const stream = await chatStream(apiMessages, dateRange);
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              assistantText += parsed.text;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: 'assistant', content: assistantText };
                return copy;
              });
            }
          } catch {}
        }
      }
    } catch (err) {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content: 'Sorry, I encountered an error. Please check your API key and try again.' };
        return copy;
      });
    } finally {
      setIsStreaming(false);
    }
  }, [messages, dateRange]);

  const clearChat = useCallback(() => {
    messages.forEach(msg => {
      if (msg._imagePreviewUrls) {
        msg._imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
      }
    });
    setMessages([]);
  }, [messages]);

  return { messages, sendMessage, isStreaming, clearChat };
}
