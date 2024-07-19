import React, { FC } from "react";
import { useAuth } from "../../../context/AuthProvider/AuthProvider";
import { useDeleteProfile, useGetUserContributions } from "../../../hooks";
import {
  Text,
  Button,
  Container,
  Loader,
  Modal,
  ToggleState,
} from "../../../ui";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { OwnContribution } from "../OwnContribution/OwnContribution";

const OwnContributions: FC = () => {
  const { user } = useAuth();
  const { isLoading, contributions } = useGetUserContributions();
  const { deleteProfile } = useDeleteProfile();

  return (
    <div className="flex flex-col mt-20">
      <ToggleState>
        {({ isToggled, handleToggle }) => (
          <div>
            <Modal isOpen={isToggled} onRequestClose={handleToggle}>
              <ConfirmationModal
                onRequestClose={handleToggle}
                onConfirm={deleteProfile}
                confirmTitle="Are you certain that you want to proceed with deleting your account?"
              />
            </Modal>

            <div className="flex flex-row items-center flex-wrap">
              <Text as="h3" textVariant="libre" className="uppercase">
                profile
              </Text>
              <div className="ml-6 mr-6 sm:ml-12 cursor-pointer">
                <Text textVariant="profile-tab">{user?.email}</Text>
              </div>
              <div className="min-w-[90px] flex flex-row sm:justify-end sm:min-w-[150px]">
                <Button buttonType="action" onClick={() => handleToggle()}>
                  <Text textVariant="action-button" className="uppercase">
                    delete
                  </Text>
                </Button>
              </div>
            </div>
          </div>
        )}
      </ToggleState>

      <div className="mt-[50px] sm:mt-[100px]">
        {isLoading ? (
          <Container className="flex justify-center items-center h-screen">
            <Loader size="md" isLoading color="black" />
          </Container>
        ) : (
          <div className="overflow-y-auto max-h-[1025px]">
            {contributions.map((contribution, index) => (
              <OwnContribution
                key={contribution.id}
                {...contribution}
                withDivider={contributions.length - 1 !== index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { OwnContributions };
