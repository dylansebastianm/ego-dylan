import { ProductDetail } from '@/components/productDetail/types';

export const fetchProductDetail = async (id: number): Promise<ProductDetail> => {
    try {
        const response = await fetch(`https://challenge.egodesign.dev/api/models/${id}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const data: ProductDetail = await response.json();
        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
};
