import { useMemo, useState } from 'react';
import { Search, Plus, User } from 'lucide-react';

export default function ContactsList({ contacts, selectedId, onSelect, onAddContact }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(q));
  }, [contacts, query]);

  return (
    <aside className="h-full flex flex-col border-r border-zinc-200 bg-white/80 backdrop-blur">
      <div className="p-4 flex items-center gap-2 border-b border-zinc-200">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full pl-8 pr-3 py-2 rounded-md bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <button
          onClick={onAddContact}
          className="inline-flex items-center gap-1 px-2.5 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" /> New
        </button>
      </div>

      <div className="overflow-y-auto">
        {filtered.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50 ${
              c.id === selectedId ? 'bg-indigo-50' : ''
            }`}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 grid place-items-center text-white">
              {c.avatar ? (
                <img src={c.avatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-zinc-900 truncate">{c.name}</p>
                {c.unread > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-600 text-white">
                    {c.unread}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 truncate">{c.preview}</p>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
