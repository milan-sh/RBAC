import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRole } from "../store/RoleSlice";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserAvatar from "./UserAvatar";
import Title from "./Title";
import { faCheck, faCircleDot, faUserPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddRoleForm from "./AddRoleForm";
import DeleteConfirm from "./DeleteConfirm";



function Hero() {
  const roles = useSelector((state) => state.roles.roleData);
  const dispatch = useDispatch();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);

  const handleDelete = (roleId) => {
    setRoleToDelete(roleId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (roleToDelete) {
      dispatch(deleteRole(roleToDelete));
    }
    setShowDeleteConfirm(false);
    setRoleToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setRoleToDelete(null);
  };

  const openEditForm = (role) => {
    setRoleToEdit(role);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setRoleToEdit(null);
    setIsFormOpen(true);
  };

  const closeFormWindow = () => {
    setIsFormOpen(false);
    setRoleToEdit(null);
  };
  console.log("roles", roles)

  return (
    <div className="bg-background p-4">
      <div className="mb-4">
      </div>
      <div className="rounded-md p-1 overflow-auto">
        <div className="bg-card border-b-2 min-w-[750px] justify-items-center md:text-base text-sm rounded-t-md border-border p-4 grid grid-cols-6 gap-x-4 font-poppins">
          <Title>Account</Title>
          <Title>Email Address</Title>
          <Title>Role</Title>
          <Title>Permissions</Title>
          <Title>Status</Title>
          <Title>Action</Title>
        </div>
        {roles.length > 0 ? (
          roles.map((role) => (
            <div
              key={role.id}
              className="bg-card min-w-[750px] justify-items-center border-b-2 grid grid-cols-6 p-4 gap-x-4 font-roboto md:text-base text-sm"
            >
              <div className="flex justify-start items-center gap-2">
                <UserAvatar size="lg" />
                <h4 className="text-textPrimary text-base">{role.name}</h4>
              </div>
              <p className="text-primary text-base underline flex items-center">
                {role.email}
              </p>
              <div className="flex items-center">
                <p className="text-textPrimary">
                  {role.role.replace("-", " ")}
                </p>
              </div>
              <div className="flex justify-start items-center gap-x-4 text-sm">
                {Object.entries(role.permissions || {})
                  .filter(([, value]) => value)
                  .map(([key]) => (
                    <div key={key} className="flex items-center">
                      <FontAwesomeIcon icon={faCheck} />
                      <p className="ml-1">{key}</p>
                    </div>
                  ))}
              </div>
              <div className="flex items-center justify-start gap-2">
                <FontAwesomeIcon
                  className={
                    role.status === "active" ? "text-success" : "text-error"
                  }
                  size="xs"
                  icon={faCircleDot}
                />
                <p className="text-base text-textPrimary">
                  {role.status === "active" ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex items-center justify-start gap-x-2">
                <Button
                  className="border-0 px-0"
                  onClick={() => openEditForm(role)}
                >
                  <FontAwesomeIcon
                    className="hover:cursor-pointer"
                    size="lg"
                    icon={faUserPen}
                  />
                </Button>
                <Button
                  className="border-0 px-0"
                  onClick={() => handleDelete(role.id)}
                >
                  <FontAwesomeIcon
                    className="hover:cursor-pointer text-error"
                    icon={faTrash}
                    size="lg"
                  />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card text-center p-4">
            <Title className="text-center m-auto">No roles found...</Title>
          </div>
        )}
      </div>

      {isFormOpen && (
        <AddRoleForm
          roleIdData={roleToEdit}
          closeFormWindow={closeFormWindow}
          mode="edit"
        />
      )}
      {console.log("role to edit",roleToEdit)}

      {showDeleteConfirm && (
        <DeleteConfirm onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
}

export default Hero;
