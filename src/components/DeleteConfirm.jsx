import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Title from "./Title";
import Button from "./Button";

function DeleteCofirm({onConfirm, onCancel}) {
  const [showForm, setShowForm] = useState(true);
  const closeForm = () => {
    setShowForm(false);
    onCancel();
  };

 

  if (!showForm) return null;
  return (
    <div className="min-h-full z-10 w-screen fixed m-auto top-0 left-0 backdrop-blur-sm bg-transparent flex justify-center items-center">
      <div className="bg-card relative md:w-2/4 h-full p-5 flex justify-center items-center flex-col gap-y-6 rounded-md">
        <Button onClick={closeForm}>
          <FontAwesomeIcon
            className="absolute right-4 top-2 hover:cursor-pointer text-textPrimary"
            size="xl"
            icon={faXmark}
          />
        </Button>
        <FontAwesomeIcon size="4x" className="text-error" icon={faTrash} />
        <Title className="text-xl font-semibold">Confirm Deletion</Title>
        <p>
          Are you sure want to delete this role.
        </p>
        <div className="flex justify-center items-center gap-x-5">
          <Button className="bg-primary text-card" onClick={onCancel}>Cancel</Button>
          <Button className="bg-error text-card" onClick={onConfirm}>Confirm Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCofirm;
