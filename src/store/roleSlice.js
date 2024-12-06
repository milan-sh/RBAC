import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  roleData: [
    {
      id: 1,
      name: "test1",
      email: "test1@gmail.com", 
      role: "admin",
      permissions: {read:true, write:true, delete: true},
      status: "active",
      // actions: []
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
        ...action.payload, // Expect payload to contain name, email, role, permission, status
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

// Export actions
export const { addData, deleteRole, updateRole } = roleSlice.actions;

// Export reducer
export default roleSlice.reducer;
