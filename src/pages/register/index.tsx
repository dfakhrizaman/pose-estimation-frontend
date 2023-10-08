/* eslint-disable react/no-unescaped-entities */
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Stack,
  Flex,
  Text,
  Anchor,
  LoadingOverlay,
  Dialog,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { setLocalStorageItem } from "@/helpers/localStorage";
import { register } from "@/services/auth";
import { useUserInfo } from "@/states/UserInfoContext";

const RegisterPage = () => {
  const router = useRouter();
  const { setUserInfo } = useUserInfo();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const showSuccessMessage = () => {
    setRegisterSuccess(true);

    setTimeout(() => {
      setRegisterSuccess(false);
    }, 3000);
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (val) =>
        val.length <= 3
          ? "Username should include at least 3 characters"
          : null,
      password: (val) =>
        val.length <= 3
          ? "Password should include at least 3 characters"
          : null,
      confirmPassword: (val, values) =>
        val.length <= 3 || values.confirmPassword !== val
          ? "Password should include at least 3 characters"
          : null,
    },
  });

  const handleSubmitRegister = form.onSubmit(async () => {
    if (form.values.password !== form.values.confirmPassword) {
      setErrorMessage("Confirm password must match password.");
    }

    try {
      setIsLoading(true);
      const { message } = await register({
        username: form.values.username,
        password: form.values.password,
      });

      if (!message) {
        setErrorMessage("Failed to register");
        throw new Error("Failed to register :(");
      }

      form.setValues({
        username: "",
        password: "",
        confirmPassword: "",
      });

      setIsLoading(false);

      showSuccessMessage();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  });

  useEffect(() => {
    setErrorMessage("");
  }, [form.values]);

  return (
    <Flex
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper radius="md" p="xl" withBorder sx={{ minWidth: 400 }}>
        <Text>Fitness Assistant</Text>

        <form onSubmit={handleSubmitRegister}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="Username"
              value={form.values.username}
              onChange={(event) =>
                form.setFieldValue("username", event.currentTarget.value)
              }
              error={form.errors.username && "Invalid Username"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 3 characters"
              }
              radius="md"
            />

            <PasswordInput
              required
              label="Confirm Password"
              placeholder="Input your password again"
              value={form.values.confirmPassword}
              onChange={(event) =>
                form.setFieldValue("confirmPassword", event.currentTarget.value)
              }
              error={form.errors.confirmPassword && "Should match password"}
              radius="md"
            />
          </Stack>

          <Text c="red">{errorMessage}</Text>

          <Group position="apart" mt="xl" align="end">
            <Button type="submit" radius="md">
              Register
            </Button>
            <Anchor onClick={() => router.push("/login")}>Login</Anchor>
          </Group>
        </form>
      </Paper>

      <Dialog opened={registerSuccess}>
        <Text>Congratulation! You have successfully registered.</Text>
      </Dialog>
      <LoadingOverlay visible={isLoading} />
    </Flex>
  );
};

export default RegisterPage;
