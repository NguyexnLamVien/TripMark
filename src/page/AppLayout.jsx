import { Outlet } from "react-router";
import PageNav from "./PageNav";

export default function AppLayout() {
  return (
    <main
      className="bg-cover bg-no-repeat m-[2.5rem] h-[calc(100vh-5rem)] px-2.5 py-5 bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(36,42,46,0.8), rgba(36,42,46,0.8)), url('./image.png')`,
      }}
    >
      <PageNav />
      <div className="flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </main>
  );
}
