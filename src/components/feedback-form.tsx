'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Share2 } from 'lucide-react';

const feedbackSchema = z.object({
  review: z.string().min(10, { message: 'Review must be at least 10 characters.' }).max(500, { message: "Review can't be more than 500 characters." }),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const { toast } = useToast();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      review: '',
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  function onSubmit(data: FeedbackFormValues) {
    console.log(data); // In a real app, send this to your backend
    toast({
      title: 'Feedback Submitted',
      description: 'Thank you for your valuable feedback!',
    });
    reset();
  }
  
  const handleShare = () => {
    const text = form.getValues('review') || "I'm loving the QuickByte Delight app!";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Share Your Thoughts</CardTitle>
          <CardDescription>We'd love to hear what you think about our app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea id="review" {...register('review')} placeholder="Tell us about your experience..." className="min-h-[120px]" />
            {errors.review && <p className="text-sm text-destructive">{errors.review.message}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share on WhatsApp
          </Button>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" /> Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
