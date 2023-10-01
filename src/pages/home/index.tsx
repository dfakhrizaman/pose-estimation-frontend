import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Modal,
  SimpleGrid,
  Title,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import ProfileFormModal from "../../components/ProfileFormModal";
import { useUserInfo } from "@/states/UserInfoContext";

const HomePage = () => {
  const { userInfo } = useUserInfo();

  const isLoading = useMemo(
    () => !userInfo.username || !userInfo.id,
    [userInfo]
  );

  const allFieldsFilled = useMemo(
    () => userInfo.age && userInfo.height && userInfo.weight && userInfo.sex,
    [userInfo]
  );

  return (
    <>
      <Flex
        sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <SimpleGrid
          cols={1}
          sx={{ minWidth: 300, maxHeight: 500, maxWidth: "50%" }}
        >
          <Title order={3} align="center">
            Choose your exercise!
          </Title>
          <Button>Jumping Jacks</Button>
          <Button>Squats</Button>
        </SimpleGrid>
      </Flex>
      <LoadingOverlay visible={isLoading} />
      <ProfileFormModal opened={!isLoading && !allFieldsFilled} />
    </>
  );
};

export default HomePage;
