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
  Title,
  LoadingOverlay,
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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const { user_info, access_token } = await login({
        username: form.values.username,
        password: form.values.password,
      });

      if (!user_info || !access_token) {
        setErrorMessage("Failed to login :(");

        return;
      }

      setUserInfo(user_info);
      await setLocalStorageItem("access_token", access_token);

      setLoading(false);
      router.push("/home");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
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
        <Title order={3} sx={{ textAlign: "center" }}>
          Fitness Assistant
        </Title>

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
            <Anchor onClick={() => router.push("/register")}>Register</Anchor>
            <Button type="submit" radius="md" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Group>
        </form>
      </Paper>
      <LoadingOverlay visible={loading} />
    </Flex>
  );
};

export default LoginPage;
