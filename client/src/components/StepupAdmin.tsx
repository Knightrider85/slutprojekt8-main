import { IUser } from '../../../server/models/userModel';
import { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';

function StepUpAdmin() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);


  useEffect(() => {
    // Fetch users from the server
    fetch('/api/users/all')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));

    // Check if the user is an admin
    fetch('/api/checkAdmin')
      .then((response) => response.json())
      .then((data) => setIsAdmin(data.isAdmin))
      .catch((error) => console.error('Error checking admin:', error));
  }, []);

  const deleteUser = (userId: string) => {
    fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.userId !== userId)
        );
      })
      .catch((error) => console.error('Error deleting user:', error));
  };
  
  const updateAdminStatus = (userId: string, isAdmin: boolean) => {
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAdmin }),
    })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => {
            if (user.userId === userId) {
              return { ...user, isAdmin } as IUser;
            }
            return user;
          })
        );
      })
      .catch((error) => console.error('Error updating admin status:', error));
  };
  

  return (
    <>
      {isAdmin && (
        <Accordion>
          {users.map((user, index) => (
            <Accordion.Item key={user.userId} eventKey={index.toString()}>
              <Accordion.Header>{user.name}</Accordion.Header>
              <Accordion.Body>
                <p>UserId: {user._id}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address}</p>
                {/* Render additional user information here */}
                <Button
                  variant="danger"
                  onClick={() => deleteUser(user.userId)}
                >
                  Delete
                </Button>{" "}
                <Button
                  variant="primary"
                  onClick={() => updateAdminStatus(user.userId, !user.isAdmin)}
                >
                  {user.isAdmin ? 'Revoke Admin' : 'Grant Admin'}
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </>
  );
}

export default StepUpAdmin;
