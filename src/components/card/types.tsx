export interface Car {
    id: number;
    name: string;
    segment: string;
    year: number;
    price: number;
    thumbnail: string;
    photo: string;
  }
  
  export interface CardProps {
    data: Car;
  }
  