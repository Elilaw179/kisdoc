import { PlaceHolderImages } from './placeholder-images';

export interface FoodCategory {
  id: string;
  name: string;
  description: string;
  healthBenefits: string[];
  imageId: string;
}

export const foodCategories: FoodCategory[] = [
  {
    id: 'leafy-greens',
    name: 'Leafy Greens',
    description: 'Packed with vitamins, minerals, and fiber, leafy greens like spinach, kale, and lettuce are a cornerstone of a healthy diet.',
    healthBenefits: [
      'Rich in vitamins A, C, and K.',
      'Excellent source of antioxidants.',
      'Promotes bone health with high calcium content.',
      'Supports heart health by improving cholesterol levels.'
    ],
    imageId: 'leafy-greens',
  },
  {
    id: 'fruits',
    name: 'Colorful Fruits',
    description: 'Naturally sweet and loaded with nutrients, fruits like berries, oranges, and apples provide essential vitamins and fight inflammation.',
    healthBenefits: [
      'High in fiber, aiding digestion and promoting fullness.',
      'Boosts immune system with high vitamin C content.',
      'Reduces risk of chronic diseases.',
      'Provides natural energy.',
    ],
    imageId: 'fruits',
  },
  {
    id: 'whole-grains',
    name: 'Whole Grains',
    description: 'Whole grains such as oats, quinoa, and brown rice are complex carbohydrates that provide sustained energy and are rich in fiber.',
    healthBenefits: [
      'Lowers risk of heart disease, stroke, and type 2 diabetes.',
      'Supports healthy digestion and prevents constipation.',
      'Helps with weight management.',
      'Provides important nutrients like B vitamins and iron.',
    ],
    imageId: 'whole-grains',
  },
  {
    id: 'lean-proteins',
    name: 'Lean Proteins',
    description: 'Essential for building and repairing tissues, lean proteins like chicken, fish, and legumes are vital for muscle growth and function.',
    healthBenefits: [
      'Builds and maintains muscle mass.',
      'Keeps you feeling full longer, aiding in weight control.',
      'Supports a healthy metabolism.',
      'Essential for hormone production and immune function.',
    ],
    imageId: 'lean-proteins',
  },
  {
    id: 'healthy-fats',
    name: 'Healthy Fats',
    description: 'Found in avocados, nuts, seeds, and olive oil, healthy fats are crucial for brain health and reducing inflammation.',
    healthBenefits: [
      'Supports brain function and improves memory.',
      'Reduces bad cholesterol levels.',
      'Helps absorb fat-soluble vitamins (A, D, E, K).',
      'Promotes healthy skin and hair.',
    ],
    imageId: 'healthy-fats',
  },
  {
    id: 'dairy-alternatives',
    name: 'Dairy & Alternatives',
    description: 'Sources of calcium and vitamin D, dairy products and their plant-based alternatives (like almond or soy milk) support strong bones.',
    healthBenefits: [
      'Crucial for building and maintaining strong bones and teeth.',
      'Provides high-quality protein.',
      'Fortified versions are a great source of Vitamin D.',
      'Supports nerve function and muscle contraction.',
    ],
    imageId: 'dairy-alternatives',
  },
];

// Helper to get image data by ID
export function getCategoryImage(imageId: string) {
  return PlaceHolderImages.find((img) => img.id === imageId);
}
