import { createSlice } from "@reduxjs/toolkit";

const selectedTableDataSlice = createSlice({
  name: "selectedTableData",
  initialState: [] as any,
  reducers: {
    setSelectedTableData: (state, action) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { setSelectedTableData } = selectedTableDataSlice.actions;
export default selectedTableDataSlice.reducer;
