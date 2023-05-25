import { Button } from "react-bootstrap";

export function UserButton() {
  return (
    <>
      <Button
        style={{
          width: "3rem",
          height: "3rem",
          position: "relative",
          color: "black", // ändra bild sedan!
        }}
        variant="outline-dark"
        className="rounded-circle"
      >
        <svg
          xmlns="client/public/noun-admin-3324336.svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <g data-name="Layer 2">
            <path
              d="M12 11a4 4 0 1 0-4-4 4 4 0 0 0 4 
        4zm6 10a1 1 0 0 0 1-1 7 7 0 0 0-14 0 1 1 0 0 0 1 1z"
              data-name="person"
            />
          </g>
        </svg>
      </Button>
    </>
  );
}
