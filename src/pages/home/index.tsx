import { Button, Flex, LoadingOverlay, SimpleGrid, Title } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import ProfileFormModal from "../../components/ProfileFormModal";
import { useUserInfo } from "@/states/UserInfoContext";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  const { userInfo, fetchData } = useUserInfo();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const isLoading = useMemo(
    () => !userInfo.username || !userInfo.id,
    [userInfo]
  );

  const allFieldsFilled = useMemo(
    () => userInfo.age && userInfo.height && userInfo.weight && userInfo.sex,
    [userInfo]
  );

  const handleClickExercise = (exerciseType: "squat" | "jumping-jack") => {
    router.push(`/exercise/${exerciseType}`);
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (allFieldsFilled) {
      setIsInfoModalOpen(false);
    } else {
      setIsInfoModalOpen(true);
    }
  }, [isLoading, allFieldsFilled]);

  useEffect(() => {
    if (fetchData) {
      fetchData();
    }
  }, []);

  return (
    <>
      <Flex
        sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <SimpleGrid
          cols={1}
          sx={{ minWidth: 300, maxHeight: 500, maxWidth: "50%" }}
        >
          <Title order={2} align="center">
            Choose your exercise!
          </Title>
          <Button onClick={() => handleClickExercise("jumping-jack")}>
            Jumping Jacks
          </Button>
          <Button onClick={() => handleClickExercise("squat")}>Squats</Button>
        </SimpleGrid>
      </Flex>

      <LoadingOverlay visible={isLoading} />
      <ProfileFormModal
        opened={!isLoading && isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
};

export default HomePage;
