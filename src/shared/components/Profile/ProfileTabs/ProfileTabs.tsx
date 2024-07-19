import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import { useLogout } from "../../../hooks";
import { Button, Modal, Text, ToggleState } from "../../../ui";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";

const profileTabs = [
  { route: "/profile", label: "profile" },
  { route: "/profile/favorites", label: "favorites" },
  { route: "/profile/guide", label: "guide" },
];

const ProfileTabs: FC = () => {
  const router = useRouter();
  const { onLogout } = useLogout();

  return (
    <ToggleState>
      {({ isToggled, handleToggle }) => (
        <div className="flex flex-row items-center justify-between">
          <Modal isOpen={isToggled} onRequestClose={handleToggle}>
            <ConfirmationModal
              onRequestClose={handleToggle}
              onConfirm={onLogout}
              confirmTitle="Do you want to sign out?"
            />
          </Modal>

          <div className="flex flex-row justify-between min-w-[190px] sm:min-w-[340px]">
            {profileTabs.map((profileTab) => (
              <Link href={profileTab.route} key={profileTab.route}>
                <Text
                  textVariant="profile-tab"
                  className={cn("uppercase", {
                    underline: router.route === profileTab.route,
                  })}
                >
                  {profileTab.label}
                </Text>
              </Link>
            ))}
          </div>

          <Button buttonType="link" onClick={() => handleToggle()}>
            <Text textVariant="profile-tab" className="uppercase">
              Sign Out
            </Text>
          </Button>
        </div>
      )}
    </ToggleState>
  );
};

export { ProfileTabs };
