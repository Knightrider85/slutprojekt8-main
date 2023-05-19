import { useNavigate } from "react-router-dom";
import TestUser from "../components/TestUser";

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

      <TestUser />
    </>
  );
}
