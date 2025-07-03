import { NavLink } from "react-router";

export default function AppNav() {
  return (
    <div className="">
      <ul className="flex justify-around bg-[#42484d] rounded-sm ">
        <li>
          <NavLink to="cities"> Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries"> Countries</NavLink>
        </li>
      </ul>
    </div>
  );
}
