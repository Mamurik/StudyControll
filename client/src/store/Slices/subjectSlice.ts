import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubject } from "../../API/api";

interface subjectState {
  subjects: ISubject[];
  selectedSubject: ISubject | null; 
}

const initialState: subjectState = {
  subjects: [],
  selectedSubject: null, 
};

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    setSubjects: (state, action: PayloadAction<ISubject[]>) => {
      state.subjects = action.payload;
    },
   
  },
});

export const { setSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;
