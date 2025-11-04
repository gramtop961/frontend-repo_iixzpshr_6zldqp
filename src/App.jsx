import { useEffect, useMemo, useState } from 'react';
import ContactsList from './components/ContactsList';
import ChatWindow from './components/ChatWindow';
import CopilotPanel from './components/CopilotPanel';

function App() {
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Alex Johnson', preview: 'Let’s meet at 3pm.', unread: 2 },
    { id: '2', name: 'Jamie Lee', preview: 'Sending the docs now.', unread: 0 },
    { id: '3', name: 'Taylor Smith', preview: 'That sounds great!', unread: 0 },
  ]);
  const [selectedId, setSelectedId] = useState('1');
  const [messagesByContact, setMessagesByContact] = useState({
    '1': [
      { id: 'm1', role: 'assistant', text: 'Hey! Are we still on for today?', time: '9:12 AM' },
      { id: 'm2', role: 'user', text: 'Yes, see you at 3pm.', time: '9:15 AM' },
    ],
    '2': [
      { id: 'm3', role: 'assistant', text: 'I’ll email the files shortly.', time: 'Yesterday' },
    ],
    '3': [
      { id: 'm4', role: 'assistant', text: 'Loved your proposal!', time: 'Mon' },
    ],
  });
  const [copilotHistory, setCopilotHistory] = useState([]);

  useEffect(() => {
    // update previews and unread when switching chats
    setContacts(prev => prev.map(c => c.id === selectedId ? { ...c, unread: 0, preview: latestPreview(selectedId) } : c));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, messagesByContact]);

  const selectedContact = useMemo(() => contacts.find(c => c.id === selectedId), [contacts, selectedId]);
  const messages = useMemo(() => messagesByContact[selectedId] ?? [], [messagesByContact, selectedId]);

  function latestPreview(id) {
    const msgs = messagesByContact[id] ?? [];
    const last = msgs[msgs.length - 1];
    return last ? last.text.slice(0, 40) : '';
    
  }

  const handleSelect = (id) => setSelectedId(id);

  const handleSend = (text) => {
    const now = new Date();
    const newMsg = { id: cryptoRandom(), role: 'user', text, time: formatTime(now) };
    setMessagesByContact(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg],
    }));
  };

  const handleAddContact = () => {
    const name = prompt('New contact name');
    if (!name) return;
    const id = cryptoRandom();
    setContacts(prev => [{ id, name, preview: '', unread: 0 }, ...prev]);
    setMessagesByContact(prev => ({ ...prev, [id]: [] }));
    setSelectedId(id);
  };

  const handleCopilotGenerate = async (prompt) => {
    // Simulate AI generation with a lightweight client-side response
    const suggestion = `Here’s a concise suggestion based on: "${prompt}"\n\n• Key point 1\n• Key point 2\n• Next step: confirm timing.`;
    const item = { id: cryptoRandom(), text: suggestion, used: false };
    setCopilotHistory(prev => [item, ...prev]);

    // Also drop the suggestion into the chat from assistant for convenience
    const now = new Date();
    const aiMsg = { id: cryptoRandom(), role: 'assistant', text: suggestion, time: formatTime(now) };
    setMessagesByContact(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), aiMsg],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-violet-50">
      <div className="mx-auto max-w-[1400px] h-screen p-4">
        <div className="h-full grid grid-cols-12 gap-4">
          <div className="col-span-3 rounded-xl overflow-hidden shadow-sm bg-white/60">
            <ContactsList
              contacts={contacts}
              selectedId={selectedId}
              onSelect={handleSelect}
              onAddContact={handleAddContact}
            />
          </div>

          <div className="col-span-6 rounded-xl overflow-hidden shadow-sm bg-white/60">
            <ChatWindow
              contact={selectedContact}
              messages={messages}
              onSend={handleSend}
            />
          </div>

          <div className="col-span-3 rounded-xl overflow-hidden shadow-sm bg-white/60">
            <CopilotPanel onGenerate={handleCopilotGenerate} history={copilotHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

function cryptoRandom() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

function formatTime(date) {
  const h = date.getHours();
  const m = date.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${m} ${ampm}`;
}

export default App;
