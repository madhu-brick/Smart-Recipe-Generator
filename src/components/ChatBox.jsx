import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import LimitReached from './Recipe_Creation/LimitReached';
import { call_api } from '../utils/utils';
import { useRouter } from 'next/router';

export default function ChatBox({ recipeId }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tokenTotal, setTokenTotal] = useState(0);
    const [limitReached, setLimitReached] = useState(false);

    const router = useRouter();
    const bottomRef = useRef(null);

    const MAX_TOKENS = 3000;

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || tokenTotal >= MAX_TOKENS) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const { reply, totalTokens, reachedLimit } = await call_api({
                address: '/api/chat-assistant',
                method: 'post',
                payload: {
                    message: input,
                    recipeId,
                    history: newMessages,
                },
            });

            if (reachedLimit) {
                setLimitReached(true);
                return;
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
            setTokenTotal((prev) => prev + (totalTokens || 0));
        } catch (error) {
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (limitReached) {
        return <LimitReached message="You have reached the maximum number of AI interactions. Please try again later." actionText="Go to Home" fullHeight />;
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-t-lg">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg px-4 py-2 max-w-xs ${msg.role === 'user' ? 'bg-brand-500 text-white' : 'bg-gray-200 text-gray-900'}`}>
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="mb-2 flex justify-start">
                        <div className="rounded-lg px-4 py-2 max-w-xs bg-gray-200 text-gray-900 animate-pulse">
                            AI is typing...
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>
            <form
                className="flex items-center p-2 border-t bg-white rounded-b-lg"
                onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                }}
            >
                <input
                    className="flex-1 border-none outline-none px-4 py-2 rounded-l-lg"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask something about this recipe..."
                    disabled={isLoading || limitReached}
                />
                <button
                    type="submit"
                    className="bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-r-lg flex items-center"
                    disabled={isLoading || !input.trim() || limitReached}
                >
                    <PaperAirplaneIcon className="h-5 w-5 mr-1" />
                    Send
                </button>
            </form>
        </div>
    );
}
