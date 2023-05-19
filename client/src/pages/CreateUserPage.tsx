import { useNavigate } from "react-router-dom";
import CreateUser from "../components/CreateUser";

export function CreateUserPage() {
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          display: "flex",

          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Step Up Account</h2>
      </div>
      <CreateUser />
    </>
  );
}
