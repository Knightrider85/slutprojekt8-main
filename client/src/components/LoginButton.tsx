import { useState } from "react";
import { Button } from "react-bootstrap";

export function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleButtonClick}
        style={{
          backgroundColor: "white",
          color: "black",
          border: "0px",
        }}
      >
        {isLoggedIn ? <span>Sign out</span> : <span>Sign in</span>}
      </Button>
    </>
  );
}
