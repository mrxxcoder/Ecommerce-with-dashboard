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

function AddProductModal({
  isModalOpen,
  onModalClose,
  product,
  setProduct,
  onChangePriceAddHandler,
  onChangeStockAddHandler,
  onChangeAddProductHandler,
  onChangeThumbnailHandler,
  onSubmitAddHandler,
}) {
  return (
    <CustomModal
      isOpen={isModalOpen}
      onClose={onModalClose}
      title="Add Product"
      onOkClick={onSubmitAddHandler}
    >
      <FormControl mb={3}>
        <FormLabel>Title</FormLabel>
        <Input
          placeholder="Product title"
          name="title"
          value={product?.title}
          onChange={onChangeAddProductHandler}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Description</FormLabel>
        <Textarea
          placeholder="Product description"
          name="description"
          value={product?.description}
          onChange={onChangeAddProductHandler}
        />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Price</FormLabel>
        <NumberInput
          name="price"
          defaultValue={product?.price}
          precision={2}
          step={0.2}
          onChange={onChangePriceAddHandler}
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
          defaultValue={product?.stock}
          precision={2}
          step={1}
          onChange={onChangeStockAddHandler}
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

export default AddProductModal;
