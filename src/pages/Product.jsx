import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();

  const getProductList = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products/${id}?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: getProductList,
  });

  console.log(data);
  const goBack = () => navigate(-1);

  function addToCartHandler() {
    dispatch(addToCart(data.data));
  }

  if (isLoading)
    return (
      <Box maxW="sm" mx={"auto"} my={20}>
        <ProductDetailsSkeleton />
      </Box>
    );

  return (
    <>
      <Flex
        alignItems={"center"}
        maxW="sm"
        mx={"auto"}
        my={7}
        fontSize={"lg"}
        cursor={"pointer"}
        onClick={goBack}
      >
        <BsArrowLeft />
        <Text ml={2}>Back</Text>
      </Flex>
      <Card
        maxW="sm"
        mx={"auto"}
        mb={20}
        border={colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"}
        bg={"none"}
      >
        <CardBody>
          <Image
            src={data?.data?.attributes?.thumbnail?.data?.attributes?.url}
            alt={data?.data?.attributes?.title}
            borderRadius="lg"
            h={"200px"}
            w={"full"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>
              {data?.data?.attributes?.description}
            </Text>
            <Text color="blue.100" fontSize="2xl" textAlign={"center"}>
              {data?.data?.attributes?.category?.data?.attributes?.title}
            </Text>
            <Text color="blue.300" fontSize="2xl" textAlign={"center"}>
              ${data?.data?.attributes?.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            variant="solid"
            colorScheme="purple"
            w={"full"}
            size={"lg"}
            bg={"#6b28ef"}
            _hover={{
              bg: "#570af2",
              border: "transparent",
            }}
            color={"white"}
            p={8}
            textTransform={"uppercase"}
            onClick={addToCartHandler}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductPage;
