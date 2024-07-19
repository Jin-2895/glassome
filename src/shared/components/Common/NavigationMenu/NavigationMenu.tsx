import React, { FC } from "react";
import Link from "next/link";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { match, P } from "ts-pattern";
import Image from "next/image";
import { Divider, Text } from "../../../ui";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";

import GlossaLogo from "../../../../assets/images/logo.png";

const NavigationMenu: FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header>
      <div className="flex flex-row items-center px-0 justify-center md:justify-between md:px-10">
        <div className="hidden md:block">
          <Link href="/">
            <Image
              src={GlossaLogo}
              width={150}
              alt="Profile"
              placeholder="blur"
            />
          </Link>
        </div>

        <div className="flex flex-row py-5">
          {match(user)
            .with({ uid: P.string }, () => (
              <div className="flex flex-row justify-between items-center min-w-[300px] sm:min-w-[450px]">
                <Link href="/">
                  <Text
                    textVariant="header-menu-link"
                    className="capitalize sm:uppercase"
                  >
                    get matched
                  </Text>
                </Link>

                <Link href="/own-contribution">
                  <Text
                    textVariant="header-menu-link"
                    className="capitalize sm:uppercase"
                  >
                    add your routine
                  </Text>
                </Link>

                <Link href="/profile">
                  <Text
                    textVariant="header-menu-link"
                    className="capitalize sm:uppercase"
                  >
                    Profile
                  </Text>
                </Link>

                <AiOutlineHeart
                  color="black"
                  className="w-[15px] h-[15px] sm:w-[25px] sm:h-[25px] cursor-pointer"
                  onClick={() => router.push("/profile/favorites")}
                />
              </div>
            ))
            .otherwise(() => (
              <div className="flex flex-row justify-between items-center min-w-[310px] sm:min-w-[450px]">
                <Link href="/">
                  <Text
                    textVariant="header-menu-link"
                    className="capitalize sm:uppercase"
                  >
                    get matched
                  </Text>
                </Link>

                <Link href="/own-contribution">
                  <Text
                    textVariant="header-menu-link"
                    className="capitalize sm:uppercase"
                  >
                    add your routine
                  </Text>
                </Link>

                <div className="flex flex-row items-center justify-between sm:min-w-[130px]">
                  <Link href="/sign-in">
                    <Text
                      textVariant="header-menu-link"
                      className="capitalize sm:uppercase"
                    >
                      Sign In
                    </Text>
                  </Link>
                  /
                  <Link href="/sign-up">
                    <Text
                      textVariant="header-menu-link"
                      className="capitalize sm:uppercase"
                    >
                      Sign Up
                    </Text>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Divider />
    </header>
  );
};

export { NavigationMenu };
