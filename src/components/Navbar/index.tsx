import { ActionIcon, Box, Flex, Image, Navbar, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { Logout } from "tabler-icons-react";
import NavbarItem from "./NavbarItem";
import { useStyles } from "./styles";
import { removeLocalStorageItem } from "@/helpers/localStorage";
import { UserInfo } from "@/types/userInfo.interface";
import { navbarList } from "@/constants/navbarList.constants";

const LoggedInNavbar = ({ userInfo }: { userInfo: UserInfo }) => {
  const router = useRouter();
  const { classes } = useStyles({});

  const handleLogout = () => {
    removeLocalStorageItem("access_token");
    router.push("/login");
  };

  return (
    <Navbar width={{ base: 300 }} className={classes.navbarRoot}>
      <Box>
        {navbarList.map((item) => (
          <NavbarItem
            key={item.id}
            title={item.label}
            icon={item.icon}
            bgColor={item.color}
            isCurrentPage={router.pathname.includes(item.route)}
            link={item.route}
          />
        ))}
      </Box>

      {/* Bottom Section */}
      <Flex className={classes.userInfoSection}>
        <Flex sx={{ alignItems: "center" }}>
          <Image
            mr={10}
            radius={50}
            width={32}
            height={32}
            src="https://media.licdn.com/dms/image/C5103AQE_duq7_sqB_Q/profile-displayphoto-shrink_200_200/0/1581653224285?e=1701302400&v=beta&t=SrciVDmTcS--BMQqhkGjdexmZOaEVek6WvzGqR3KNcM"
            alt="profile"
          />
          <Box>
            <Text className={classes.userName}>{userInfo.username}</Text>
          </Box>
        </Flex>

        <ActionIcon size={24} color="dark" onClick={handleLogout}>
          <Logout />
        </ActionIcon>
      </Flex>
    </Navbar>
  );
};

export default LoggedInNavbar;
