import { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { isSignedIn } from "./LoginForm";

export function LoginButton() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isLoggedInState, setIsLoggedInState] = useState(
    isSignedIn && !isLoginPage
  );

  const handleButtonClick = () => {
    setIsLoggedInState(false);
  };

  return (
    <>
      {isLoginPage ? (
        <Button
          style={{
            backgroundColor: "white",
            color: "black",
            border: "0px",
          }}
          onClick={handleButtonClick}
        >
          <span>Sign in</span>
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: "white",
            color: "black",
            border: "0px",
          }}
          onClick={handleButtonClick}
        >
          {isLoggedInState ? <span>Sign out</span> : <span>Sign in</span>}
        </Button>
      )}
    </>
  );
}
