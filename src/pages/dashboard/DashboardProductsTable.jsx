import TableSkeleton from "./TableSkeleton";
import {
  useAddDashboardProductMutation,
  useDeleteDashboardProductMutation,
  useGetDashboardProductsQuery,
  useUpdateDashboardProductMutation,
} from "../../app/services/apiSlice";
import {
  Button,
  Flex,
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
import { useEffect, useState } from "react";
import UpdateProductModal from "../../components/UpdateProductModal";
import AddProductModal from "../../components/AddProductModal";

function DashboardProductsTable() {
  const initialProduct = {
    title: "",
    description: "",
    price: 1,
    stock: 1,
    thumbnail: null,
  };

  const [product, setProduct] = useState(initialProduct);

  const [clickedProductId, setClickedProductId] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalEditOpen,
    onOpen: onModalEditOpen,
    onClose: onModalEditClose,
  } = useDisclosure();
  const {
    isOpen: isModalAddOpen,
    onOpen: onModalAddOpen,
    onClose: onModalAddClose,
  } = useDisclosure();
  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });

  const [deleteProduct, { isLoading: isDeleting, isSuccess }] =
    useDeleteDashboardProductMutation();

  const [
    updateProduct,
    { isLoading: isUpdating, isSuccess: isUpdatingSuccess },
  ] = useUpdateDashboardProductMutation();

  const [addProduct, { isLoading: isAdding, isSuccess: isAddingSuccess }] =
    useAddDashboardProductMutation();

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value,
    });
  }

  function onChangeAddProductHandler(e) {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  }

  console.log(product);

  function onChangePriceAddHandler(value) {
    setProduct({
      ...product,
      price: +value,
    });
  }

  function onChangeStockAddHandler(value) {
    setProduct({
      ...product,
      stock: +value,
    });
  }

  function onChangeThumbnailHandler(e) {
    setThumbnail(e.target.files[0]);
  }

  function onSubmitHandler() {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: productToEdit.title,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    updateProduct({ id: clickedProductId, body: formData });
  }

  function onSubmitAddHandler() {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: product.title,
        description: product.description,
        price: product.price,
        stock: product.stock,
      })
    );
    formData.append("files.thumbnail", thumbnail);
    addProduct(formData);
  }
  console.log(thumbnail);

  useEffect(
    function () {
      if (isSuccess) {
        setClickedProductId(null);
        onClose();
      }
      if (isUpdatingSuccess) {
        setClickedProductId(null);
        onModalEditClose();
      }
    },
    [isSuccess, isUpdatingSuccess, onClose, onModalEditClose]
  );

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      <Flex mx="auto" maxW="85%" direction="column" gap="2rem" mt={6}>
        <Button
          colorScheme="blue"
          w="fit-content"
          ml="auto"
          onClick={() => {
            setProduct();
            onModalAddOpen();
          }}
        >
          Add Product
        </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>
              Total Entries: {data?.data?.length ?? 0}
            </TableCaption>
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
                        product?.attributes?.thumbnail?.data?.attributes
                          ?.formats?.thumbnail?.url
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
                      onClick={() => {
                        setClickedProductId(product.id);
                        onOpen();
                      }}
                    >
                      <BsTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        setClickedProductId(product.id);
                        setProductToEdit(product.attributes);
                        onModalEditOpen();
                      }}
                    >
                      <FiEdit2 size={17} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <CustomAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title="Are you sure?"
        description="Do you want to delete this product? This connot be undone."
        okText="Yes, delete"
        isLoading={isDeleting}
        onOkHandler={() => {
          deleteProduct(clickedProductId);
        }}
      />
      <AddProductModal
        isModalOpen={isModalAddOpen}
        onModalClose={onModalAddClose}
        isLoading={isAdding}
        product={product}
        setProduct={setProduct}
        onChangePriceAddHandler={onChangePriceAddHandler}
        onChangeStockAddHandler={onChangeStockAddHandler}
        onChangeAddProductHandler={onChangeAddProductHandler}
        onChangeThumbnailHandler={onChangeThumbnailHandler}
        onSubmitAddHandler={onSubmitAddHandler}
      />

      <UpdateProductModal
        isModalOpen={isModalEditOpen}
        onModalClose={onModalEditClose}
        isUpdating={isUpdating}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        onChangeThumbnailHandler={onChangeThumbnailHandler}
      />
    </>
  );
}

export default DashboardProductsTable;
