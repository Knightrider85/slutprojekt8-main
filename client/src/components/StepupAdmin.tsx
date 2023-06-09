import { useEffect, useState } from "react";
import { Accordion, Button, Modal, Table } from "react-bootstrap";
import { IOrder } from "../../../server/models/orderModel";
import { IUser } from "../../../server/models/userModel";
import { useNavigate } from "react-router-dom";

function StepUpAdmin() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users from the server
    fetch("/api/users/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched users:", data); // Add this line for debugging
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Check if the user is an admin
    fetch("/api/checkAdmin")
      .then((response) => response.json())
      .then((data) => {
        setIsAdmin(data.isAdmin);
        if (!data.isAdmin) {
          navigate("/");
        }
      })
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

  useEffect(() => {
    // Fetch all orders from server
    const getOrders = () => {
      fetch("/api/orders/all")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched orders:", data);
          setOrders(data);
        })
        .catch((error) => console.error("Error fetching orders:", error));
    };

    if (showModal) {
      getOrders();
    }
  }, [showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {isAdmin && (
        <>
          <Button variant="dark" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Users
          </Button>
          {isDropdownOpen && (
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
                      {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </>
      )}

      <Button variant="primary" onClick={() => setShowModal(true)}>
        View Orders
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Orders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td colSpan={2}>
                    <h4>Order ID: {order._id}</h4>
                    <p>Name: {order.name}</p>
                    <p>Address: {order.address}</p>
                    <p>City: {order.city}</p>
                    <p>Zipcode: {order.zip}</p>
                    <p>Email: {order.email}</p>
                    <p>Phone: {order.phone}</p>
                    <h5>Products:</h5>
                    {order.products.map((product, index) => (
                      <div key={index}>
                        <p>Product: {product.name}</p>
                        <p>Quantity: {order.quantity[index]}</p>
                      </div>
                    ))}
                    <p>Total cost: {order.totalCost} kr</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StepUpAdmin;
