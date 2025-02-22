export interface ModelFeature {
  name: string;
  description: string;
  image: string;
}

export interface ModelHighlight {
  title: string;
  content: string;
  image: string;
}

export interface ProductDetail {
  id: number;
  name: string;
  segment: string;
  year: number;
  price: number;
  thumbnail: string;
  photo: string;
  title: string;
  description: string;
  model_features: ModelFeature[];
  model_highlights: ModelHighlight[];
}
