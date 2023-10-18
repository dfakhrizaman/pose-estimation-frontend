import { formattedTimeAndDate } from "@/helpers/stringFormatter";
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import Squat from "../../assets/squat.svg";
import JumpingJack from "../../assets/jumping.svg";

interface Props {
  type: string;
  score: string;
  duration: string | number;
  completed_at: Date;
  username?: string;
}

function ActivityItem({
  type,
  score,
  duration,
  completed_at,
  username,
}: Props) {
  const completedDate = new Date(completed_at);

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
      <Box>
        <Title order={2} size={22}>
          {username || "[uname not found]"}
        </Title>

        <Flex sx={{ alignItems: "center", marginTop: 12, gap: 8 }}>
          <Image
            height={24}
            width={24}
            src={type === "squat" ? Squat.src : JumpingJack.src}
            alt={type === "squat" ? "squat" : "jumping jack"}
          />
          <Title order={4}>
            {type === "squat" ? "Squats" : "Jumping Jacks"}
          </Title>
        </Flex>
      </Box>
      <Flex>
        <Box sx={{ marginRight: 20 }}>
          <Text>Score:</Text>
          <Text>Duration:</Text>
          <Text>Time & Date: </Text>
        </Box>
        <Box sx={{ minWidth: 200 }}>
          <Text
            sx={{
              color: score === "10" ? "green" : "orange",
              fontWeight: 900,
            }}
          >
            {score}/10
          </Text>
          <Text
            sx={{
              fontWeight: 600,
            }}
          >
            {duration ? `${duration} Seconds` : "-"}
          </Text>
          <Text>{formattedTimeAndDate(completedDate)}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ActivityItem;
