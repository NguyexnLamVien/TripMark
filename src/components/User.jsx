import { useFakeAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router";
import App from "./../App";

function User() {
  const navigate = useNavigate();
  const { user, logout } = useFakeAuth();

  const handleClick = () => {
    logout();
    navigate("/app");
  };

  return (
    <div className="flex justify-between bg-gray-700 items-center rounded-md gap-3 px-4 py-2 ">
      <img src={user.avatar} alt="" className="w-10 h-10 rounded-full" />
      <span className="font-bold">{user.name}</span>
      <button className="btn" onClick={handleClick}>
        logout
      </button>
    </div>
  );
}

export default User;
