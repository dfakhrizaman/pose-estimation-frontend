import { formattedTimeAndDate } from "@/helpers/stringFormatter";
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import Squat from "../../assets/squat.svg";
import JumpingJack from "../../assets/jumping.svg";

interface Props {
  number: number;
  username: string;
  userId: string;
  count: string;
}

function LeaderboardItem({ number, username, userId, count }: Props) {
  return (
    <Flex
      px={30}
      py={20}
      sx={{
        border: "1px solid #E9ECEF",
        borderRadius: "10px",
        justifyContent: "space-between",
        marginTop: 24,
      }}
    >
      <Text
        sx={{
          fontSize: 24,
          fontWeight: "bold",
        }}
      >
        #{number}
      </Text>
      <Box>
        <Title order={2} size={22}>
          {username || "[uname not found]"}
        </Title>
      </Box>
      <Box>
        <Text>Number of exercises in the past 7 days: </Text>
        <Text sx={{ fontWeight: "bold" }}>{count}</Text>
      </Box>
    </Flex>
  );
}

export default LeaderboardItem;
