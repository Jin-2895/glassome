import Link from "next/link";
import React, { FC } from "react";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { Container, Text } from "../../../ui";

const Footer: FC = () => {
  const { user } = useAuth();

  return (
    <footer>
      <Container className="py-50 px-12 lg:px-24 lg:py-100">
        <div className="flex flex-col space-y-4 items-center  sm:flex-row sm:space-x-0 justify-between sm:items-baseline">
          <div className="flex flex-col items-center sm:items-start">
            {!user?.uid && (
              <Link href="/sign-up">
                <Text textVariant="dark-link">Sign up</Text>
              </Link>
            )}
            <Link href="/privacy-policy">
              <Text textVariant="dark-link">Privacy policy</Text>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Text as="h3" textVariant="dark-link-bold">
              Talk to us
            </Text>
            <Link href="mailto:hello@glossa.me" target="_blank">
              <Text textVariant="dark-link">hello@glossa.me</Text>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Text as="h3" textVariant="dark-link-bold">
              Follow us
            </Text>
            <Link href="https://www.instagram.com/glossame/" target="_blank">
              <Text textVariant="dark-link">Instagram</Text>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
