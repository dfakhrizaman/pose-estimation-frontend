import { initialUpdateProfilePayload } from "@/constants/userInfo.constants";
import { getLocalStorageItem } from "@/helpers/localStorage";
import { updateProfile } from "@/services";
import { Sex, UpdateProfilePayload } from "@/types/userInfo.interface";
import {
  Button,
  Modal,
  Select,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import React, { ChangeEvent, useState } from "react";

interface ProfileFormModalProps {
  opened: boolean;
}

const ProfileFormModal = ({ opened }: ProfileFormModalProps) => {
  const [updateProfilePayload, setUpdateProfilePayload] =
    useState<UpdateProfilePayload>(initialUpdateProfilePayload);

  const allFieldsFilled =
    updateProfilePayload.age &&
    updateProfilePayload.height &&
    updateProfilePayload.weight &&
    updateProfilePayload.sex;

  const handleChange = (event: ChangeEvent<HTMLInputElement> | Sex) => {
    if (typeof event === "string") {
      setUpdateProfilePayload((prev) => ({
        ...prev,
        sex: event,
      }));

      return;
    }

    if (!/^\d{0,3}$/.test(event.target.value)) {
      return;
    }

    setUpdateProfilePayload((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSave = async () => {
    try {
      const token = await getLocalStorageItem("access_token");
      const res = await updateProfile(token, updateProfilePayload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        centered
        withCloseButton={false}
        opened={opened}
        onClose={() => null}
      >
        <Title order={3}>Please Fill Out Your Info</Title>
        <SimpleGrid spacing={10} cols={1}>
          <TextInput
            label="Age (Year)"
            name="age"
            required
            value={updateProfilePayload.age}
            onChange={handleChange}
          />
          <TextInput
            label="Weight (Kg)"
            name="weight"
            required
            value={updateProfilePayload.weight}
            onChange={handleChange}
          />
          <TextInput
            label="Height (Cm)"
            name="height"
            required
            value={updateProfilePayload.height}
            onChange={handleChange}
          />
          <Select
            label="Sex"
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            onChange={handleChange as (e: string) => void}
          />
          <Button mt={10} onClick={handleSave} disabled={!allFieldsFilled}>
            Save
          </Button>
        </SimpleGrid>
      </Modal>
    </div>
  );
};

export default ProfileFormModal;
