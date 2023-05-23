import { IUser } from '../../../server/models/userModel';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';


function StepUpAdmin() {
  const [users, setUsers] = useState<IUser[]>([]); // Specify the type as IUser[]
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <>
      {isAdmin && (
        <Accordion>
          {users.map((user) => (
            <Accordion.Item key={user.userId} eventKey={user.userId}>
              <Accordion.Header>{user.name}</Accordion.Header>
              <Accordion.Body>
                <p>UserId: {user._id}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address}</p>
                {/* Render additional user information here */}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </>
  );
}

export default StepUpAdmin;
