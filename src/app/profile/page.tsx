import { ProfileForm } from '@/components/profile-form';

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">My Profile</h1>
      <ProfileForm />
    </div>
  );
}
