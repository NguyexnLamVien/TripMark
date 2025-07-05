import { Outlet, useNavigate } from "react-router";
import SideBar from "../components/SideBar";
import Map from "../components/Map";

import User from "../components/user";

export default function MapLayout() {
  return (
    <div className="flex justify-center m-[2.5rem] h-[calc(100vh-5rem)] px-2.5 py-5 relative">
      <div className="sidebar">
        <SideBar />
        <Outlet />
        <footer>© Copyright 2025 by WorldWise Inc.</footer>
      </div>
      <Map />
      <div className="absolute top-10 right-8">
        <User />
      </div>
    </div>
  );
}
