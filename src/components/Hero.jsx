import React, {useState} from "react";
import Title from "./Title";
import UserAvatar from "./UserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  faUserPen,
  faTrash,
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import AddRoleForm from "./AddRoleForm";
import Button from "./Button";
import SaveChangesAlert from "./SaveChangesAlert"
import DeleteConfirm from "./DeleteConfirm"


function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data) => {
    console.log("Form Data:", data);
    handleCloseModal();
  };
  return (
    <div className="bg-background p-4">
      <div className="rounded-md p-1">
        <div className="bg-card border-b-2 rounded-t-md border-border p-4 grid grid-cols-6 gap-x-4 font-poppins">
          <Title>Account</Title>
          <Title>Email Address</Title>
          <Title>Role</Title>
          <Title>Permission</Title>
          <Title>Status</Title>
          <Title>Action</Title>
        </div>
        <div className="bg-card border-b-2 grid grid-cols-6 p-4 gap-x-4 font-roboto">
          <div className="flex justify-start items-center gap-2">
            <UserAvatar size="lg" />
            <h4 className="text-textPrimary  text-base">Milan Singh</h4>
          </div>
          <p className="text-primary text-base underline flex items-center">
            <a href="">milan083821@gmail.com</a>
          </p>
          <div className="flex items-center">
            <p className=" text-textPrimary">Super Admin</p>
          </div>
          <div className="flex justify-start items-center gap-x-4 text-sm">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheck} />
              <p className="ml-1">Read</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCheck} />
              <p className="ml-1">Write</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faXmark} />
              <p className="ml-1">Delete</p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-2">
            <FontAwesomeIcon
              className="text-success"
              size="xs"
              icon={faCircleDot}
            />
            <p className="text-base text-textPrimary ">Active</p>
          </div>
          <div className="flex items-center justify-start gap-x-8">
            <Button className="border-0 px-0">
              <FontAwesomeIcon
                className="hover:cursor-pointer"
                size="lg"
                icon={faUserPen}
                onClick={handleOpenModal}
              />
            </Button>
            <Button className="border-0 px-0">
              <FontAwesomeIcon
                className="hover:cursor-pointer text-error"
                icon={faTrash}
                size="lg"
              />
            </Button>
            <Button className="border-0 px-0">
              <FontAwesomeIcon
                icon={faEye}
                size="lg"
                className="hover:cursor-pointer text-primary"
              />
            </Button>
          </div>
        </div>
      </div>
      <AddRoleForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
      <SaveChangesAlert/>
      <DeleteConfirm/>
    </div>
  );
}

export default Hero;
