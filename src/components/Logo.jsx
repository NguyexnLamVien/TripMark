import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to={"/"} className="logo">
      <img src="logo.png" alt="logo" className="h-15 object-contai " />
    </Link>
  );
}
