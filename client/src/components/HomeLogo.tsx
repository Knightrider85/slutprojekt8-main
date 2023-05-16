import { Button } from "react-bootstrap";
import svglogonew from "/svglogonew.svg";

export function HomeLogo() {
  return (
    <Button
      style={{
        width: "3rem",
        height: "3rem",
        position: "relative",
        color: "white",
        backgroundImage: `url(${svglogonew})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        border: "none",
      }}
      variant="outline-secondary"
      // className="rounded-circle"
    ></Button>
  );
}
