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
      <Button onClick={handleButtonClick}>
        {isLoggedIn ? <span>Logga in</span> : <span>Logga ut</span>}
      </Button>
    </>
  );
}
