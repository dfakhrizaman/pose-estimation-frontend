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
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from "@/helpers/localStorage";
import { login } from "@/services/auth";
import { useUserInfo } from "@/states/UserInfoContext";

const LoginPage = () => {
  const router = useRouter();
  const { setUserInfo } = useUserInfo();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
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
    },
  });

  const handleSubmitLogin = form.onSubmit(async () => {
    try {
      const { user_info, access_token } = await login({
        username: form.values.username,
        password: form.values.password,
      });

      if (!user_info || !access_token) {
        throw new Error("Failed to login :(");
      }

      setUserInfo(user_info);
      await setLocalStorageItem("access_token", access_token);

      router.push("/");
    } catch (error) {
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

        <form onSubmit={handleSubmitLogin}>
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
          </Stack>

          <Text c="red">{errorMessage}</Text>

          <Group position="apart" mt="xl" align="end">
            <Button type="submit" radius="md">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
};

export default LoginPage;
