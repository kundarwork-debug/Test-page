export type ChocolateTheme = 'white' | 'dark' | 'silk' | 'pista';

export interface ChocolateCollection {
  id: string;
  type: ChocolateTheme;
  watermark: string;
  subtitle: string;
  description: string;
  image: string;
  particleColors: string[];
}
