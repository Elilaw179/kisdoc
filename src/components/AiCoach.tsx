"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Sparkles, Loader2 } from "lucide-react";
import {
  getPersonalizedFoodRecommendations,
  type PersonalizedFoodRecommendationsOutput,
} from "@/ai/flows/personalized-food-recommendations";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  dietaryNeeds: z.string().min(10, {
    message: "Please describe your dietary needs in at least 10 characters.",
  }),
  healthGoals: z.string().min(10, {
    message: "Please describe your health goals in at least 10 characters.",
  }),
  foodPreferences: z.string().min(10, {
    message: "Please describe your food preferences in at least 10 characters.",
  }),
});

export function AiCoach() {
  const [recommendation, setRecommendation] =
    useState<PersonalizedFoodRecommendationsOutput | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryNeeds: "",
      healthGoals: "",
      foodPreferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setRecommendation(null);
    try {
      const result = await getPersonalizedFoodRecommendations(values);
      setRecommendation(result);
    } catch (error) {
      console.error("AI recommendation error:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description:
          "There was a problem with the AI. Please try again later.",
      });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <section id="ai-coach" className="mb-12 md:mb-16">
      <Card className="shadow-lg border-2 border-primary/20 bg-card">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle className="font-headline text-3xl">
                Personalized AI Food Coach
              </CardTitle>
              <CardDescription>
                Get instant, expert advice tailored to your unique needs.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="dietaryNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Needs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., vegetarian, gluten-free, low-fodmap..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="healthGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Health Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., lose weight, build muscle, more energy..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="foodPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Preferences</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., love spicy food, dislike cilantro, allergic to nuts..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isPending} size="lg">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Advice...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get My Recommendation
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        {(isPending || recommendation) && <Separator className="my-4" />}
        {isPending && (
          <CardFooter className="flex-col items-start gap-4">
             <Skeleton className="h-8 w-1/2" />
             <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
             </div>
          </CardFooter>
        )}
        {recommendation && (
          <CardFooter className="flex-col items-start gap-4">
            <h3 className="font-headline text-2xl text-primary">
              Your Personalized Recommendations
            </h3>
            <div className="space-y-4 text-foreground/90 prose prose-sm max-w-none">
              <h4 className="font-semibold text-lg">Recommended Foods</h4>
              <p className="whitespace-pre-wrap">
                {recommendation.recommendations}
              </p>
              <h4 className="font-semibold text-lg">Why It's a Good Fit</h4>
              <p className="whitespace-pre-wrap">{recommendation.reasoning}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
