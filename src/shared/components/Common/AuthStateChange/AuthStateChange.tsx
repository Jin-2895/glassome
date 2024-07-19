import { onAuthStateChanged } from "firebase/auth";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../../../../pages/api/firebaseApi";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { Loader } from "../../../ui";

const AuthStateChange: FC<PropsWithChildren> = ({ children }) => {
  const { setUser } = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        const newUser = {
          uid: user.uid || "",
          email: user.email || "",
        };
        setUser(newUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader isLoading={isLoading} size="md" color="black" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export { AuthStateChange };
