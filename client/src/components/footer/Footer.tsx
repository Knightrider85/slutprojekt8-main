import "../footer/footer.css";

export function Footer() {
  return (
    <footer>
      <div
        className="footer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        Copyrights &#169;
      </div>
    </footer>
  );
}
