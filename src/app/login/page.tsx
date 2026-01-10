'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, Shield } from 'lucide-react';

type UserRole = 'user' | 'staff';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate credentials based on selected role
    const isValidUser = selectedRole === 'user' && email === 'faizan@gmail.com' && password === '1111';
    const isValidStaff = selectedRole === 'staff' && email === 'store@gmail.com' && password === '1111';

    if (isValidUser || isValidStaff) {
      if (login(email, password)) {
        if (selectedRole === 'staff') {
          router.push('/staff-dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError('Authentication failed. Please try again.');
      }
    } else {
      setError(`Invalid ${selectedRole} credentials. Please check your email and password.`);
    }
  };

  const getCredentialsHint = () => {
    if (selectedRole === 'user') {
      return 'faizan@gmail.com / 1111';
    } else {
      return 'store@gmail.com / 1111';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Login to QuickByte Delight</CardTitle>
              <CardDescription>
                Enter your credentials to access the application
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedRole === 'user' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('user')}
                className="flex items-center gap-1"
              >
                <Users className="h-4 w-4" />
                User
              </Button>
              <Button
                variant={selectedRole === 'staff' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedRole('staff')}
                className="flex items-center gap-1"
              >
                <Shield className="h-4 w-4" />
                Staff
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {selectedRole === 'user' ? 'User' : 'Staff'} Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={`Enter your ${selectedRole} email`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                {selectedRole === 'user' ? 'User' : 'Staff'} Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={`Enter your ${selectedRole} password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-1">
                <Shield className="h-4 w-4" />
                {selectedRole === 'user' ? 'User' : 'Staff'} Credentials
              </div>
              <p className="text-blue-700 text-xs">
                <strong>{getCredentialsHint()}</strong>
              </p>
            </div>
            <Button type="submit" className="w-full">
              Login as {selectedRole === 'user' ? 'User' : 'Staff'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}