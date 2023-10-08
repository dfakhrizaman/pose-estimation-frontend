import {
  Anchor,
  Box,
  Collapse,
  Flex,
  Group,
  Image,
  Stepper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function ActivityItem() {
  const [opened, { toggle }] = useDisclosure(false);

  // if (!order) return <Box />;

  return (
    <Box sx={{ marginBottom: 16 }}>
      <Flex
        px={30}
        py={20}
        sx={{
          border: "1px solid #E9ECEF",
          borderRadius: opened ? "10px 10px 0px 0px" : "10px",
          justifyContent: "space-between",
        }}
      >
        <Title order={2} size={22}>
          Username
        </Title>
        <Group>
          <Flex sx={{ alignItems: "center" }}>
            {/* <Image
              height="14px"
              width="14px"
              src={MultipleUsers.src}
              alt="Unit"
              sx={{ marginRight: 6 }}
            /> */}
            <Text>Squat</Text>
          </Flex>
          <Flex sx={{ alignItems: "center" }}>
            {/* <Image
              height="14px"
              width="14px"
              src={Eye.src}
              alt="Status"
              sx={{ marginRight: 6 }}
            /> */}
            <Text>10/10</Text>
          </Flex>

          <Anchor onClick={toggle}>{opened ? "Tutup" : "Lihat Detail"}</Anchor>
        </Group>
      </Flex>

      <Collapse in={opened}>
        <Box
          py={30}
          px={30}
          sx={{
            border: "1px solid #E9ECEF",
            borderRadius: "0px 0px 10px 10px",
          }}
        >
          <Text mb={10}>Date</Text>
          <Title order={3} size={18} weight="bold">
            Status Order
          </Title>
        </Box>
      </Collapse>
    </Box>
  );
}

export default ActivityItem;
