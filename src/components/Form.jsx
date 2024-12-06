import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Title from "./Title";
import Input from "./Input";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addData, updateRole } from "../store/RoleSlice";

function Form({ closeFormWindow, mode = "add", roleIdData }) {
  const [showForm, setShowForm] = useState(true);
  const [customPermissions, setCustomPermissions] = useState(
    roleIdData?.permissions?.custom || []
  );
  const [newPermission, setNewPermission] = useState(null);
  const dispatch = useDispatch();

  const closeForm = () => {
    setShowForm(false);
    closeFormWindow();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: roleIdData?.name || "",
      email: roleIdData?.email || "",
      role: roleIdData?.role || "",
      status: roleIdData?.status || "",
      permissions: {
        read: roleIdData?.permissions?.read || false,
        write: roleIdData?.permissions?.write || false,
        delete: roleIdData?.permissions?.delete || false,
      },
    },
  });

  // Add Custom Permission
  const handleAddCustomPermission = () => {
    if (newPermission.trim().length>0 && !customPermissions.includes(newPermission)) {
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
    if (mode === "add") {
      const payload = {
        ...data, // New data (name, email, role, status, permissions)
        permissions: { ...data.permissions, custom: customPermissions },
      };
      dispatch(addData(payload));
    } else if (mode === "edit") {
      if (!roleIdData || !roleIdData.id) {
        console.error("Error: Role ID is required for edit mode.");
        return;
      }
  
      const payload = {
        id: roleIdData.id, // Role to update
        updatedData: {
          ...data, // Updated data
          permissions: { ...data.permissions, custom: customPermissions },
        },
      };
      dispatch(updateRole(payload)); // Update role data
    }
  
    closeForm();
  };
  

  if (!showForm) return null;

  return (
    <div className="min-h-full z-10 w-screen fixed top-0 left-0 backdrop-blur-sm bg-transparent flex justify-center items-center">
      <div className="md:w-3/4 w-[90%] relative bg-card md:p-6 p-2 rounded-lg">
        <Button onClick={closeForm}>
          <FontAwesomeIcon
            className="absolute right-4 top-2 hover:cursor-pointer text-textPrimary"
            size="xl"
            icon={faXmark}
          />
        </Button>
        <Title className="text-xl font-poppins">
          {mode === "add" ? "Add New Role" : "Edit Role"}
        </Title>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="space-y-4">
              <Input
                label="Name:"
                type="text"
                className="w-full border rounded-md p-2 border-border"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
              <Input
                label="Email:"
                type="email"
                className="w-full border rounded-md p-2 border-border"
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
              <div>
                <label className="block text-sm font-medium">Role:</label>
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
            <div className="space-y-4">
              <div className="md:mb-9">
                <label className="block text-sm font-medium mb-2">
                  Permissions:
                </label>
                <div className="flex gap-x-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...register("permissions.read")} />
                    Read
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...register("permissions.write")} />
                    Write
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...register("permissions.delete")} />
                    Delete
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Add Custom Permissions:
                </label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={newPermission}
                    className="w-full border rounded-md p-2 border-border"
                    onChange={(e) => setNewPermission(e.target.value)}
                  />
                  <Button
                    className="bg-primary text-white rounded-md px-2 py-1"
                    onClick={handleAddCustomPermission}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
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
              <div>
                <label className="block text-sm font-medium">Status:</label>
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
          <div className="flex justify-end gap-4">
            <Button
              className="bg-error text-white rounded-md"
              onClick={closeFormWindow}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-white rounded-md"
              type="submit"
            >
              {mode === "add" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
