import { FeedbackForm } from "@/components/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-headline text-3xl font-bold tracking-tight">Give Feedback</h1>
      <FeedbackForm />
    </div>
  );
}
