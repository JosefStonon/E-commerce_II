"use client";

import { ProductType } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchProducts } from "../actions";
import Product from "./Product";

function InfinitScroll({
  initialProducts,
}: {
  initialProducts: ProductType[];
}) {
  const [products, setProducts] = useState<ProductType[]>(initialProducts);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const lastProductsId = products[products.length - 1]?.id;

  const loadMoreProducts = useCallback(async () => {
    setIsLoading(true);
    const { formatedProducts, has_more } = await fetchProducts({
      lastProductsId,
    });

    if (formatedProducts) {
      setProducts((prevProducts) => [...prevProducts, ...formatedProducts]);
      setHasMore(has_more);
    }

    setIsLoading(false);
  }, [lastProductsId]);

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreProducts();
    }
  }, [hasMore, inView, isLoading, loadMoreProducts]);

  if(!products)
    return <div>carregando...</div>

  return (
    <>
      {products.map((product) => (
        <Product key={product.id} product={product}></Product>
      ))}

      {
        hasMore && 
          <div ref={ref}>
            carragando mais registro...
          </div>
        
      }
    </>
  );
}

export default InfinitScroll;
