import { createContext } from "react";
import StoreAuth from "../utils/StoreAuth";

const AuthContext = createContext([null, () => {}]);
export const AuthProvider = (props) => {
  const [auth, setAuth] = StoreAuth("auth", null);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
