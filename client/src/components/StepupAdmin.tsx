import { IUser } from "../../../server/models/userModel";
import { useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";

function StepUpAdmin() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);


  useEffect(() => {
    // Fetch users from the server
    fetch("/api/users/all")
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched users:', data); // Add this line for debugging
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Check if the user is an admin
    fetch("/api/checkAdmin")
      .then((response) => response.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((error) => console.error("Error checking admin:", error));
  }, []);

  const deleteUser = (userId: string) => {
    console.log("Deleting user with userId:", userId); // Check the value of userId

    fetch(`/api/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const updateAdminStatus = (userId: string, isAdmin: boolean) => {
    fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isAdmin }),
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user._id === userId) {
              return { ...user, isAdmin } as IUser;
            }
            return user;
          })
        );
      })
      .catch((error) => console.error("Error updating admin status:", error));
  };

  const handleSignOutUser = () => {
    fetch("/api/signOut", {
      method: "POST",
    })
      .then(() => {
        setIsAdmin(false); // Reset the isAdmin state
      })
      .catch((error) => console.error("Error signing out user:", error));
  };

  return (
    <>
      {isAdmin && (
        <Accordion>
          {users.map((user, index) => (
            <Accordion.Item key={user._id} eventKey={index.toString()}>
              <Accordion.Header>{user.name}</Accordion.Header>
              <Accordion.Body>
                <p>UserId: {user._id}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address}</p>
                <p>isAdmin: {user.isAdmin.toString()}</p>
                {/* Render additional user information here */}
                <Button
                  variant="danger"
                  onClick={() => {
                    console.log("userId:", user._id); // Add this line for debugging
                    deleteUser(user._id);
                  }}
                >
                  Delete
                </Button>

                <Button
                  variant="primary"
                  onClick={() => updateAdminStatus(user._id, !user.isAdmin)}
                >
                  {user.isAdmin ? "Revoke Admin" : "Grant Admin"}
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
                <Button variant="primary" onClick={handleSignOutUser}>
            Sign Out
          </Button>
    </>
  );
}

export default StepUpAdmin;
