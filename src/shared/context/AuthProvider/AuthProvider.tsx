import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { FirebaseUser } from "../../models";

interface Context {
  user: FirebaseUser | null;
  setUser: Dispatch<SetStateAction<FirebaseUser | null>>;
}

export const AuthContext = createContext<Context>({} as Context);
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
