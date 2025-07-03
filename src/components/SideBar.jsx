import AppNav from "./AppNav";
import Logo from "./Logo";

export default function SideBar() {
  return (
    <nav className=" flex flex-col gap-10">
      <Logo />
      <AppNav />
    </nav>
  );
}
