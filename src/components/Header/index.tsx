import { Header, Text, Box, rem, Title } from "@mantine/core";
import { useStyles } from "./styles";

export function LoggedInHeader() {
  const { classes } = useStyles();
  return (
    <Box>
      <Header height={60} className={classes.root}>
        <Title order={1} className={classes.title}>
          Fitness Assistant
        </Title>
      </Header>
    </Box>
  );
}
