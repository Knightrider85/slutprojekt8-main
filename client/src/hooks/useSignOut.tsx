/* export default const useSignOut = async (values: any) => {
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
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error signing in user:", error);
    }
  }; */