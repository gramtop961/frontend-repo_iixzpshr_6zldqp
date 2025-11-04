import { useState } from 'react';
import { Paperclip, Mic, Send } from 'lucide-react';

export default function MessageInput({ onSend }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-zinc-200 p-3">
      <div className="flex items-end gap-2 bg-white rounded-xl border border-zinc-200 p-2">
        <button className="p-2 text-zinc-500 hover:text-zinc-700">
          <Paperclip className="h-5 w-5" />
        </button>
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="flex-1 resize-none max-h-40 outline-none text-sm p-2"
        />
        <button className="p-2 text-zinc-500 hover:text-zinc-700">
          <Mic className="h-5 w-5" />
        </button>
        <button
          onClick={submit}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
