import { useContext, useReducer } from "react";
import { createContext } from "react";

const fakeUser = {
  name: "LAzy",
  email: "jack@example.com",
  password: "123",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
};
const initialState = {
  user: null,
  isAuthenticated: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown action");
  }
};

const FakeAuthContext = createContext();

const FakeAuthProvider = ({ children }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = (mail, password) => {
    if (mail == fakeUser.email && password == fakeUser.password) {
      dispatch({ type: "login", payload: fakeUser });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <FakeAuthContext.Provider
      value={{ dispatch, user, isAuthenticated, login, logout }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
};

const useFakeAuth = () => {
  const context = useContext(FakeAuthContext);
  if (!context) {
    throw new Error("useFakeAuth must be used within a FakeAuthProvider");
  }
  return context;
};

export { FakeAuthProvider, useFakeAuth };
