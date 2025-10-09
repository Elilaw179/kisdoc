import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { foodCategories, getCategoryImage } from '@/lib/food-data';
import { CheckCircle2 } from 'lucide-react';

export function FoodCategories() {
  return (
    <section id="food-categories">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Explore Food Categories</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">Discover the health benefits and nutritional power of different food groups.</p>
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {foodCategories.map((category) => {
          const image = getCategoryImage(category.imageId);
          return (
            <Accordion type="single" collapsible key={category.id}>
              <AccordionItem value={category.id} className="border-b-0">
                <CardWithImage>
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={image.description}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover rounded-t-lg"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  <div className="p-6">
                    <AccordionTrigger className="w-full text-left text-xl font-bold font-headline hover:no-underline p-0">
                      {category.name}
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="px-6">
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <h4 className="font-semibold mb-2">Key Health Benefits:</h4>
                    <ul className="space-y-2">
                      {category.healthBenefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </CardWithImage>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
}

// A simple wrapper to provide the card-like container for the accordion items
const CardWithImage = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    {children}
  </div>
);
