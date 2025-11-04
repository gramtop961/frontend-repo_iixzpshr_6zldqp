import { useState } from 'react';
import { Sparkles, Send, Check } from 'lucide-react';

export default function CopilotPanel({ onGenerate, history }) {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const run = async (value) => {
    const text = (value ?? prompt).trim();
    if (!text) return;
    setLoading(true);
    try {
      await onGenerate(text);
      setPrompt('');
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Summarize the last 10 messages',
    'Draft a friendly reply',
    'Extract action items',
    'Translate to Spanish',
  ];

  return (
    <aside className="h-full flex flex-col border-l border-zinc-200 bg-gradient-to-b from-white to-indigo-50/40">
      <div className="p-4 border-b border-zinc-200 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-indigo-600 text-white grid place-items-center">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-medium text-zinc-900">Co‑Pilot</h3>
          <p className="text-xs text-zinc-500">Ask AI to help with your conversation</p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => run(q)}
              className="text-xs px-2.5 py-1.5 rounded-full bg-white border border-zinc-200 hover:border-indigo-400 hover:text-indigo-700"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {history.length === 0 ? (
          <div className="text-sm text-zinc-500 p-4 bg-white border border-dashed border-zinc-300 rounded-lg">
            Your AI results will appear here. Try a quick prompt above.
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="bg-white border border-zinc-200 rounded-lg p-3 text-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wide text-zinc-400">Suggestion</span>
                {item.used && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600"><Check className="h-3 w-3" />Applied</span>
                )}
              </div>
              <p className="text-zinc-800 whitespace-pre-wrap">{item.text}</p>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-zinc-200">
        <div className="flex items-center gap-2 bg-white rounded-xl border border-zinc-200 p-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Co‑Pilot…"
            className="flex-1 outline-none text-sm px-2"
          />
          <button
            onClick={() => run()}
            disabled={loading}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
