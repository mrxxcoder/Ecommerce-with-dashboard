import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiEye } from "react-icons/hi2";
import { HiEyeSlash } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading } = useSelector(selectLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }

    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }

    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
    console.log(user);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                errorBorderColor={"crimson"}
                isInvalid={isEmail}
                name={"identifier"}
                value={user.identifier}
                onChange={onChangeHandler}
              />
              {isEmail && (
                <FormHelperText color="red.500">
                  Email is required.
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  errorBorderColor="crimson"
                  isInvalid={isPassword}
                  name={"password"}
                  value={user.password}
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <HiEye size={26} />
                    ) : (
                      <HiEyeSlash size={26} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText color="red.500">
                  Password is required.
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
