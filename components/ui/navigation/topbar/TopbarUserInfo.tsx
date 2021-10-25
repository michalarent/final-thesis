import { useUser } from "../../../../hooks/user";
import { CircularProgress } from "@material-ui/core";

export default function TopbarUserInfo() {
  const user = useUser();

  if (!user) {
    return <CircularProgress />;
  }

  return (
    <>
      <img
        style={{
          display: "inline",
          maxWidth: "20px",
          borderRadius: "10px",
        }}
        src={user.imageUrl}
      />
      <span style={{ padding: "0 5px" }}>{user.name}</span>
    </>
  );
}
