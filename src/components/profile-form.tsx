'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getUser } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  mobile: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: 'Invalid mobile number format (e.g., 123-456-7890).' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const user = getUser();

export function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  function onSubmit(data: ProfileFormValues) {
    console.log(data); // In a real app, you'd send this to your backend
    toast({
      title: 'Profile Updated',
      description: 'Your profile information has been saved.',
    });
    setIsEditing(false);
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>View and edit your personal details.</CardDescription>
            </div>
             <Button type="button" variant={isEditing ? 'secondary' : 'default'} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : <><Edit className="mr-2 h-4 w-4"/> Edit</>}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline" disabled={!isEditing}>Change Photo</Button>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} disabled={!isEditing} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input id="mobile" {...register('mobile')} disabled={!isEditing} />
            {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" {...register('email')} disabled={!isEditing} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter>
            <Button type="submit">
                <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
