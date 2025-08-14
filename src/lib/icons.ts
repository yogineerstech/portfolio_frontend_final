import { 
  Globe, 
  BookOpen,
  Brain, 
  Database,
  Store,
  Smartphone,
  Monitor,
  Cloud,
  TrendingUp,
  Code,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'Globe': Globe,
  'BookOpen': BookOpen,
  'Brain': Brain,
  'Database': Database,
  'Store': Store,
  'Smartphone': Smartphone,
  'Monitor': Monitor,
  'Cloud': Cloud,
  'TrendingUp': TrendingUp,
  'Code': Code,
};

export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Code; // Default to Code icon if not found
};
