import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignOut = async (values: any) => {
    try {
      const response = await fetch("/api/signOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User signed out successfully");
        setLoggedIn(false);
      }
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  };

   useEffect(() => {
    fetch("/api/checkSignedIn").then((response) => response.json()).then((data)=> {
      setLoggedIn(true);
    }).catch((error) => console.log("Error checking if a user is logged in", error))
  },[]) 

  return (
    <>

        <Button
          style={{
            backgroundColor: "white",
            color: "black",
            border: "0px",
          }}
          onClick={handleSignOut}
        >
          {loggedIn ? <span>Sign out</span> : <span>Sign in</span>}
        </Button>

    </>
  );
}
