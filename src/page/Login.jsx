import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFakeAuth } from "../context/FakeAuthContext";

export default function Login() {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const { login, isAuthenticated } = useFakeAuth();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="bg-[#42484d] rounded-2xl w-[40%] flex flex-col gap-4  mt-32 mx-auto px-8 py-12"
    >
      <label htmlFor="TestEmail">Email address</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-2 py-1 rounded-sm bg-amber-50 text-black"
        placeholder="jack@example.com"
      />

      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="px-2 py-1 rounded-sm bg-amber-50 text-black"
      />

      <button className="button" type="submit">
        Login
      </button>
    </form>
  );
}
