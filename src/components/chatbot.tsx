'use client';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { getChatbotResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getUser } from '@/lib/data';

type Message = {
  role: 'user' | 'bot';
  text: string;
};

const user = getUser();

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getChatbotResponse({ query: input });
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
      } else if (result.response) {
        const botMessage: Message = { role: 'bot', text: result.response };
        setMessages((prev) => [...prev, botMessage]);
      }
    });
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-muted/50 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'bot' && (
              <Avatar className="h-8 w-8">
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background'
              }`}
            >
              {msg.text}
            </div>
             {msg.role === 'user' && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
         {isPending && (
            <div className="flex items-start gap-3">
                 <Avatar className="h-8 w-8">
                    <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-background flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <form onSubmit={handleSubmit} className="flex gap-2 pt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
