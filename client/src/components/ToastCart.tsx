import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer, { ToastPosition } from "react-bootstrap/ToastContainer";
import { Product } from "../../data";

interface ToastCartProps {
  product: Product;
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToastCart(props: ToastCartProps) {
  return (
    <ToastContainer
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        zIndex: 9999,
      }}
    >
      <Toast
        show={props.showToast}
        autohide
        delay={5000}
        onClose={() => props.setShowToast(false)}
        onClick={() => props.setShowToast(false)}
      >
        <Toast.Header closeButton={true}>
          <img
            src="holfder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">{props.product.title}</strong>
          <small className="text-muted">just now</small>
        </Toast.Header>
        <Toast.Body data-cy="added-to-cart-toast">Har lagts till</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
