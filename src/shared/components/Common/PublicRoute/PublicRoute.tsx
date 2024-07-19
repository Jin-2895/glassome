import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { Loader } from "../../../ui";

const PublicRoute: FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (user?.uid) {
    router.push("/");
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader isLoading size="md" color="black" />
      </div>
    );
  }

  return <div>{children};</div>;
};

export { PublicRoute };
