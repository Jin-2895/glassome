import { FC } from "react";
import { Button, Text } from "../../../ui";

interface DeleteConfirmationModalProps {
  onRequestClose: () => void;
  onConfirm: () => Promise<void>;
  confirmTitle: string;
}

const ConfirmationModal: FC<DeleteConfirmationModalProps> = ({
  onRequestClose,
  onConfirm,
  confirmTitle,
}) => {
  return (
    <div className="flex flex-col mt-4 text-center w-[270px] sm:w-[350px]">
      <Text as="p" textVariant="dark-label">
        {confirmTitle}
      </Text>
      <div className="flex flex-row items-center justify-evenly mt-4">
        <Button onClick={() => onConfirm()}>
          <Text className="uppercase font-bold">confirm</Text>
        </Button>
        <div className="min-w-[100px]">
          <Button isDarkBackground onClick={() => onRequestClose()}>
            <Text className="text-white uppercase font-bold">cancel</Text>
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ConfirmationModal };
