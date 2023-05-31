import { Button } from "react-bootstrap";

interface LoginButtonProps {
  loggedIn: boolean;
  onSignOut: () => void;
}

export function LoginButton({ loggedIn, onSignOut }: LoginButtonProps) {
  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/signOut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("User signed out successfully");
        onSignOut();
      }
    } catch (error) {
      console.error("Error signing out user:", error);
    }
  };

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
        {loggedIn ? <span>Sign Out</span> : <span>Sign In</span>}
      </Button>
    </>
  );
}
