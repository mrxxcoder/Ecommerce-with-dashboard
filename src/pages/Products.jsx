import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

function ProductsPage() {
  const getProductList = async () => {
    const data = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?populate=thumbnail,category`
    );

    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProductList,
  });

  if (isLoading) {
    return (
      <Grid
        templateColumns="repeat(auto-fill , minmax(300px, 1fr))"
        gap={6}
        margin={30}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill , minmax(300px, 1fr))"
      gap={6}
      margin={30}
    >
      {data.data.data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
}

export default ProductsPage;
