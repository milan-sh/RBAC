import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  roleData: [
    {
      id: 1,
      name: "test1",
      email: "test1@gmail.com", 
      role: "admin",
      permissions: {read:true, write:true, delete: false},
      status: "active",
    },
    {
      id: 2,
      name: "test2",
      email: "test2@gmail.com", 
      role: "super admin",
      permissions: {read:true, write:true, delete: true},
      status: "active",
    },
    {
      id: 3,
      name: "test3",
      email: "test3@gmail.com", 
      role: "super admin",
      permissions: {read:true, write:false, delete: false},
      status: "active",
    },
  ],    
};

export const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    // Add new role
    addData: (state, action) => {
      const role = {
        id: nanoid(),
        ...action.payload, 
      };
      state.roleData.push(role);
    },

    // Delete role by ID
    deleteRole: (state, action) => {
      state.roleData = state.roleData.filter(
        (role) => role.id !== action.payload
      );
    },
    updateRole: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.roleData.findIndex((role) => role.id === id);
    
      if (index !== -1) {
        state.roleData[index] = {
          ...state.roleData[index],
          ...updatedData, // Merge existing role data with updated fields
        };
      }
    },
    
  },
});


export const { addData, deleteRole, updateRole } = roleSlice.actions;


export default roleSlice.reducer;
