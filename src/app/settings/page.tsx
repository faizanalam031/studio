import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Settings</h1>
      <Tabs defaultValue="payments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="payments">Payment Settings</TabsTrigger>
          <TabsTrigger value="address">Address Book</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Manage your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No saved payment methods.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="address" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Address Book</CardTitle>
              <CardDescription>Manage your delivery addresses.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No saved addresses.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Settings</CardTitle>
              <CardDescription>Manage your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Notifications are enabled.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
