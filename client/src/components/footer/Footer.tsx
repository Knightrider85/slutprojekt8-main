import { CartLink } from "../CartLink";
import "../footer/footer.css";

export function Footer() {
  return (
    <footer>
      <div className="footer" style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            padding: "2rem",
          }}>
        Copyrights &#169; reserved by PALIMEDA webshop 2023
        <CartLink ></CartLink>
      </div>
    </footer>
  );
}
