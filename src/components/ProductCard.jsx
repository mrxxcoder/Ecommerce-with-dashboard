import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ProductCard({ id, attributes }) {
  const { colorMode } = useColorMode();
  console.log(attributes);

  return (
    <Card bg={"none"} border={"1px solid#a8b5c8"}>
      <CardBody>
        <Image
          src={attributes?.thumbnail?.data?.attributes?.url}
          alt="Green double couch with wooden legs"
          boxSize={"200px"}
          borderRadius={"full"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" textAlign={"center"} mb={2}>
            {attributes.title}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="purple.600" fontSize="2xl" textAlign={"center"}>
            $450
          </Text>
          <Button
            as={Link}
            to={`/products/${id}`}
            bg={colorMode === "light" ? "#edf3f6" : "#9f7aea"}
            color={colorMode !== "light" ? "#edf3f6" : "#9f7aea"}
            size={"xl"}
            variant={"outline"}
            border={"none"}
            py={5}
            overflow={"hidden"}
            w={"full"}
            _hover={{
              bg: colorMode !== "light" ? "#edf3f6" : "#9f7aea",
              color: colorMode === "light" ? "white" : "#9f7aea",
              border: "transparent",
            }}
            mt={6}
          >
            View Details
          </Button>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
