import { Box, Flex, Image, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useStyles } from "./styles";

interface Props {
  title: string;
  icon: string;
  bgColor: string;
  link: string;
  isCurrentPage: boolean;
}

const NavbarItem = ({ title, icon, bgColor, link, isCurrentPage }: Props) => {
  const router = useRouter();
  const { classes } = useStyles({ isCurrentPage });

  const handleClick = () => {
    router.push(link);
  };

  return (
    <Flex onClick={handleClick} className={classes.navbarItemRoot}>
      <Box p={10} bg={bgColor} sx={{ borderRadius: 4, marginRight: 10 }}>
        <Image height="12px" width="12px" src={icon} alt={title} />
      </Box>

      <Text sx={{ fontSize: 14 }}>{title}</Text>
    </Flex>
  );
};

export default NavbarItem;
