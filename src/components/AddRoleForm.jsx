import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Title from "./Title";
import Input from "./Input";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function AddRoleForm() {
  const [showForm, setShowForm] = useState(true);
  const closeForm = () => {
    setShowForm(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [customPermissions, setCustomPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState("");

  // Add Custom Permission
  const handleAddCustomPermission = () => {
    if (newPermission.trim() && !customPermissions.includes(newPermission)) {
      setCustomPermissions([...customPermissions, newPermission]);
      setNewPermission("");
    }
  };

  // Remove Custom Permission
  const handleRemovePermission = (permission) => {
    setCustomPermissions(
      customPermissions.filter((perm) => perm !== permission)
    );
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!showForm) return null;

  return (
    <div className="min-h-full z-10 w-screen fixed m-auto top-0 left-0 backdrop-blur-sm bg-transparent flex justify-center items-center">
      <div className="md:w-3/4 relative bg-card p-4 rounded-lg flex justify-center flex-col items-start gap-y-5">
        <Button onClick={closeForm}>
          <FontAwesomeIcon
            className="absolute right-4 top-2 hover:cursor-pointer text-textPrimary"
            size="xl"
            icon={faXmark}
          />
        </Button>
        <Title className="text-xl font-poppins">Add New Role</Title>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <div className="flex  flex-col">
              <Input
                label="Name:"
                type="text"
                className="border border-border rounded-md p-2 w-full"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm ">{errors.name.message}</p>
              )}
              <Input
                label="Email:"
                type="email"
                className="border border-border rounded-md p-2 w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <div className="flex flex-col w-full">
                <label className="outline-none text-textPrimary bg-inherit">
                  Role:
                </label>
                <select
                  className="border border-border rounded-md p-2 w-full outline-none"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="">Select a Role</option>
                  <option value="super-admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>
            </div>
            <div className="flex  flex-col">
              <div className="flex flex-col gap-y-5">
                {/* Permissions Checkboxes */}
                <div className="flex flex-col ">
                  <label className="outline-none text-textPrimary bg-inherit">
                    Permissions:
                  </label>
                  <div className="flex gap-x-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("permissions.read")}
                      />
                      Read
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("permissions.write")}
                      />
                      Write
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register("permissions.delete")}
                      />
                      Delete
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="outline-none text-textPrimary bg-inherit md:mt-5">
                  Add New Permissions:
                </label>
                <div className="flex gap-x-2">
                  <Input
                    type="text"
                    className="border border-border rounded-md p-2 w-full"
                    value={newPermission}
                    onChange={(e) => setNewPermission(e.target.value)}
                  />
                  <Button
                    className="bg-primary text-white rounded-md hover:bg-secondary px-2 py-1 h-fit"
                    onClick={handleAddCustomPermission}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customPermissions.map((permission, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-x-2 bg-gray-200 px-2 py-1 rounded-md"
                    >
                      <span>{permission}</span>
                      <Button
                        type="button"
                        onClick={() => handleRemovePermission(permission)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="outline-none text-textPrimary bg-inherit">
                  Status:
                </label>
                <select
                  className="border border-border rounded-md p-2 w-full outline-none"
                  {...register("status", { required: "Status is required" })}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-x-8 mt-4 justify-end">
            <Button className="bg-error text-white rounded-md px-5 py-2">
              Cancel
            </Button>
            <Button
              className="bg-primary text-white rounded-md px-5 py-2"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoleForm;
