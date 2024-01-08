"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Link,
} from "@chakra-ui/react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import CartDrawer from "../components/CartDrawer";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

const Links = ["Products", "Dashboard"];

const NavLink = ({ children }) => {
  return (
    <Link
      as={RouterLink}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      to={children.toLowerCase()}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const token = CookieService.get("jwt");
  const { cartProducts } = useSelector(selectCart);
  const dispatch = useDispatch();

  function onOpen() {
    dispatch(onOpenCartDrawerAction());
  }

  function logoutHandler() {
    CookieService.remove("jwt");
    window.location.reload();
  }
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <RouterLink to="/">ECOMMERCE</RouterLink>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoonOutline /> : <IoSunnyOutline />}
              </Button>
              <Button onClick={onOpen}>Cart ({cartProducts.length})</Button>
              {!token ? (
                <NavLink as={RouterLink} to="/login">
                  Login
                </NavLink>
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
              <CartDrawer />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
