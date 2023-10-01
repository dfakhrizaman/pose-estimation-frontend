import { createStyles } from "@mantine/core";
import { BorderRadius } from "tabler-icons-react";

interface StyleProps {
  isCurrentPage?: boolean;
}

export const useStyles = createStyles(
  (theme, { isCurrentPage }: StyleProps) => ({
    navbarItemRoot: {
      backgroundColor: isCurrentPage ? "#F8F9FA" : "transparent",
      alignItems: "center",
      borderRadius: 4,
      padding: 10,
      marginBottom: 10,
      cursor: "pointer",
    },
    navbarRoot: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 10,
      paddingTop: 20,
    },
    userInfoSection: {
      borderTop: "1px solid #E9ECEF",
      paddingTop: 20,
      paddingBottom: 10,
      margin: 10,
      justifyContent: "space-between",
      alignItems: "center",
    },
    userName: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: "capitalize",
    },
    userRole: {
      fontSize: 12,
      color: "#868E96",
      textTransform: "capitalize",
    },
  })
);
