import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onCloseCartDrawerAction,
  selectGlobal,
} from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart, selectCart } from "../app/features/cartSlice";

function CartDrawer() {
  const btnRef = useRef();
  const dispatch = useDispatch();
  const { isOpenCartDrawer } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);

  function onClose() {
    dispatch(onCloseCartDrawerAction());
  }
  return (
    <Drawer
      isOpen={isOpenCartDrawer}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Your Shopping Cart</DrawerHeader>

        <DrawerBody>
          {cartProducts.map((product) => (
            <CartDrawerItem key={product.id} {...product} />
          ))}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant="outline"
            colorScheme={"red"}
            mr={3}
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear All
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
