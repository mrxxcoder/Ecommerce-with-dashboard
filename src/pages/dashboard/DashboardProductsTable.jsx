import TableSkeleton from "./TableSkeleton";
import { useGetDashboardProductsQuery } from "../../app/services/apiSlice";
import {
  Button,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import CustomAlertDialog from "../../shared/AlertDialog";

function DashboardProductsTable() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, data, error } = useGetDashboardProductsQuery({ page: 1 });
  console.log({ isLoading, data, error });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <TableContainer mx="auto" maxW="85%">
        <Table variant="simple">
          <TableCaption>Total Entries: {data?.data?.length ?? 0}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Thumbnail</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product) => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>
                  <Image
                    borderRadius="full"
                    objectFit={"cover"}
                    boxSize="40px"
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      product?.attributes?.thumbnail?.data?.attributes?.formats
                        ?.thumbnail?.url
                    }`}
                    alt={product?.attributes?.title}
                  />
                </Td>
                <Td>{product?.attributes?.title}</Td>
                <Td>
                  {product?.attributes?.category?.data?.attributes?.title ??
                    "N/A"}
                </Td>

                <Td isNumeric>${product?.attributes?.price}</Td>
                <Td isNumeric>{product?.attributes?.stock}</Td>
                <Td>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    colorScheme="purple"
                    variant="solid"
                    mr={3}
                    onClick={() => {}}
                  >
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="solid"
                    mr={3}
                    onClick={onOpen}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button colorScheme="blue" variant="solid">
                    <FiEdit2 size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title="Are you sure?"
        description="Do you want to delete this product? This connot be undone."
        okText="Yes, delete"
      />
    </>
  );
}

export default DashboardProductsTable;
