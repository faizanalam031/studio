import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getWalletBalance, getWalletTransactions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Gift, CreditCard } from 'lucide-react';

function UpiIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 6.2h2.8c.4 0 .9.2 1.2.6s.4.7.4 1.2v2.8"/><path d="M14 2.8h2.8c.4 0 .9.2 1.2.6s.4.7.4 1.2v0"/><path d="M10 2.8H7.2c-.4 0-.9.2-1.2.6s-.4.7-.4 1.2v0"/><path d="M10 6.2H7.2c-.4 0-.9.2-1.2.6s-.4.7-.4 1.2v2.8"/><path d="M6.2 14v2.8c0 .4.2.9.6 1.2s.7.4 1.2.4h0"/><path d="M2.8 14v2.8c0 .4.2.9.6 1.2s.7.4 1.2.4h2.8"/><path d="M2.8 10V7.2c0-.4.2-.9.6-1.2s.7-.4 1.2-.4h0"/><path d="M6.2 10H4.4c-.4 0-.9.2-1.2.6s-.4.7-.4 1.2v2.8"/><path d="m14.4 17.2 3.5-3.5"/><path d="m11.2 20 3.2-3.2"/><path d="M18 10V7.2c0-.4-.2-.9-.6-1.2s-.7-.4-1.2-.4h-2.8"/><path d="M21.2 10V7.2c0-.4-.2-.9-.6-1.2s-.7-.4-1.2-.4h-2.8"/><path d="M21.2 18.8v-2.1c0-.4-.2-.9-.6-1.2s-.7-.4-1.2-.4h-2.1"/></svg>
    )
}

export default function AccountPage() {
  const balance = getWalletBalance();
  const transactions = getWalletTransactions();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Account & Wallet</h1>
      <Tabs defaultValue="wallet">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="upi">UPI</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="giftcards">Gift Cards</TabsTrigger>
        </TabsList>
        <TabsContent value="wallet" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Wallet</CardTitle>
              <CardDescription>View your balance and transaction history.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-primary text-primary-foreground p-6">
                <p className="text-sm">Current Balance</p>
                <p className="text-4xl font-bold">${balance.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map(t => (
                      <TableRow key={t.id}>
                        <TableCell>{t.date}</TableCell>
                        <TableCell>{t.description}</TableCell>
                        <TableCell className={cn("text-right font-medium", t.type === 'credit' ? 'text-green-600' : 'text-red-600')}>
                          {t.type === 'credit' ? '+' : '-'}${t.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upi" className="mt-6">
           <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><UpiIcon /> UPI</CardTitle>
                <CardDescription>Manage your UPI IDs for quick payments.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No UPI IDs linked yet.</p>
            </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="cards" className="mt-6">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard /> Credit & Debit Cards</CardTitle>
                <CardDescription>Manage your saved cards.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No cards saved yet.</p>
            </CardContent>
           </Card>
        </TabsContent>
        <TabsContent value="giftcards" className="mt-6">
            <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gift /> Gift Cards</CardTitle>
                <CardDescription>Add and manage your gift cards.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No gift cards available.</p>
            </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
