import React, { FC } from "react";
import { useRouter } from "next/router";
import { AiOutlineHeart } from "react-icons/ai";
import { Button, Divider, Text } from "../../../ui";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";

const titlesMapper = {
  Profile: "profile",
  "Sign in": "sign-in",
} as const;

const Header: FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const isAuthenticated = user?.uid ? "Profile" : "Sign in";
  const route = titlesMapper[isAuthenticated];

  return (
    <header>
      <div className="flex flex-row items-center justify-between px-7 py-2 sm:py-5 lg:px-28">
        <Button buttonType="link" onClick={() => router.push("/")}>
          <Text textVariant="dark-link" className="sm:uppercase">
            Get matched
          </Text>
        </Button>
        <div className="flex flex-row items-center justify-between min-w-[175px] sm:min-w-[380px]">
          <Button
            buttonType="link"
            onClick={() => router.push("/own-contribution")}
          >
            <Text textVariant="dark-link" className="sm:uppercase">
              Contribute
            </Text>
          </Button>
          <Button buttonType="link" onClick={() => router.push(`/${route}`)}>
            <Text textVariant="dark-link" className="sm:uppercase">
              {isAuthenticated}
            </Text>
          </Button>
          {user?.uid && (
            <AiOutlineHeart
              className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] cursor-pointer"
              onClick={() => router.push("/profile/favorites")}
            />
          )}
        </div>
      </div>
      <Divider />
    </header>
  );
};
export { Header };
