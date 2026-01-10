import { Chatbot } from '@/components/chatbot';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Help & Support</h1>
      <Card>
        <CardHeader>
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Have a question about the app? Ask our AI assistant!</CardDescription>
        </CardHeader>
        <CardContent>
            <Chatbot />
        </CardContent>
      </Card>
    </div>
  );
}
