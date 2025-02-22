import React from "react";
import ProductDetail from "@/components/productDetail";
import { fetchProductDetail } from "./utils";
import { ProductDetail as ProductDetailType } from "@/components/productDetail/types";
import Highlight from "@/components/productDetail/highlights/index";
import Carrousel from "@/components/carrousel/index";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product: ProductDetailType = await fetchProductDetail(Number(params.id));

  return (
    <div>
      <ProductDetail data={product} />
      <Carrousel features={product.model_features} />
      <Highlight highlights={product.model_highlights} />
    </div>
  );
};

export default ProductPage;
