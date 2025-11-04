import { useEffect, useRef } from 'react';
import { Phone, Video, Info, MoreVertical } from 'lucide-react';
import MessageInput from './MessageInput';

export default function ChatWindow({ contact, messages, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, contact?.id]);

  if (!contact) {
    return (
      <section className="h-full flex items-center justify-center text-zinc-500">
        Select a conversation to start chatting
      </section>
    );
  }

  return (
    <section className="h-full flex flex-col bg-white/60">
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-white/80">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white grid place-items-center font-medium">
            {contact.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-zinc-900">{contact.name}</h3>
            <p className="text-xs text-zinc-500">Online now</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-zinc-600">
          <button className="p-2 hover:bg-zinc-100 rounded-md" title="Call"><Phone className="h-4 w-4" /></button>
          <button className="p-2 hover:bg-zinc-100 rounded-md" title="Video"><Video className="h-4 w-4" /></button>
          <button className="p-2 hover:bg-zinc-100 rounded-md" title="Info"><Info className="h-4 w-4" /></button>
          <button className="p-2 hover:bg-zinc-100 rounded-md" title="More"><MoreVertical className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} isMe={m.role === 'user'} text={m.text} time={m.time} />
        ))}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={onSend} />
    </section>
  );
}

function MessageBubble({ isMe, text, time }) {
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
        isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-zinc-200 rounded-bl-sm'
      }`}>
        <p className="whitespace-pre-wrap leading-relaxed">{text}</p>
        <div className={`mt-1 text-[10px] ${isMe ? 'text-indigo-100' : 'text-zinc-400'}`}>{time}</div>
      </div>
    </div>
  );
}
