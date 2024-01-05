import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductDetailsSkeleton = () => {
  return (
    <Box padding="6" bg="transparent" rounded={"lg"}>
      <Skeleton h={200} />
      <SkeletonText mt="4" maxW={200} noOfLines={1} spacing="4" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" maxW={120} mx={"auto"} />
      <Skeleton mt="4" h={50} rounded={"lg"} spacing="4" w={"full"} />
    </Box>
  );
};

export default ProductDetailsSkeleton;
