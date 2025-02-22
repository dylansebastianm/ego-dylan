import { Car } from "@/components/card/types";

  export const fetchCars = async (): Promise<Car[]> => {
    try {
      const response = await fetch('https://challenge.egodesign.dev/api/models/');
      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }
      const data: Car[] = await response.json();
      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  };