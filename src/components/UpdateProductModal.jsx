import {
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import CustomModal from "../shared/Modal";

function UpdateProductModal({
  isModalOpen,
  onModalClose,
  isUpdating,
  onSubmitHandler,
  productToEdit,
  setProductToEdit,
  onChangeHandler,
  onChangeThumbnailHandler,
}) {
  function onChangePriceHandler(value) {
    setProductToEdit({
      ...productToEdit,
      price: +value,
    });
  }

  function onChangeStockHandler(value) {
    setProductToEdit({
      ...productToEdit,
      stock: +value,
    });
  }

  return (
    <CustomModal
      isOpen={isModalOpen}
      onClose={onModalClose}
      title="Update Product"
      isLoading={isUpdating}
      onOkClick={onSubmitHandler}
    >
      <FormControl mb={3}>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Product title"
          name="title"
          value={productToEdit?.title}
          onChange={onChangeHandler}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Product description"
          name="description"
          value={productToEdit?.description}
          onChange={onChangeHandler}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Price</FormLabel>
        <NumberInput
          name="price"
          defaultValue={productToEdit?.price}
          precision={2}
          step={0.2}
          onChange={onChangePriceHandler}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl my={3}>
        <FormLabel>Stock</FormLabel>
        <NumberInput
          name="stock"
          defaultValue={productToEdit?.stock}
          precision={2}
          step={1}
          onChange={onChangeStockHandler}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel>Thumbnail</FormLabel>
        <Input
          id="thumbnail"
          type="file"
          h={"full"}
          p={2}
          accept="image/png, image/gif, image/jpeg"
          onChange={onChangeThumbnailHandler}
        />
      </FormControl>
    </CustomModal>
  );
}

export default UpdateProductModal;
