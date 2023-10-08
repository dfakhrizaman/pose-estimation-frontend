import User from "../assets/user.svg";
import MultipleUsers from "../assets/multiple_users.svg";

export const navbarList = [
  {
    id: 1,
    label: "Home",
    value: "home",
    route: "/home",
    icon: User.src,
    color: "#D0EBFF",
  },
  {
    id: 2,
    label: "Leaderboard",
    value: "leaderboard",
    route: "/leaderboard",
    icon: MultipleUsers.src,
    color: "#D0EBFF",
  },
];
