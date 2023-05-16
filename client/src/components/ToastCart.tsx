import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer, { ToastPosition } from "react-bootstrap/ToastContainer";
import { Product } from "../../data";

interface ToastCartProps {
  product: Product;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToastCart(props: ToastCartProps) {  
  const [position, setPosition] = useState<ToastPosition>('bottom-end');
 
  return (
    <ToastContainer position={position}>
      <Toast show={props.showToast} autohide delay={5000} onClose={() => props.setShowToast(false)}>
        <Toast.Header closeButton={true}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{props.product.title}</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body data-cy="added-to-cart-toast">Har lagts till</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
