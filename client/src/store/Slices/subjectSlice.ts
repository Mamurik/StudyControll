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
    setSelectedSubject: (state, action: PayloadAction<ISubject>) => {
      state.selectedSubject = action.payload;
    },
    clearSelectedSubject: (state) => {
      state.selectedSubject = null;
    },
  },
});

export const { setSubjects, setSelectedSubject, clearSelectedSubject } = subjectSlice.actions;

export default subjectSlice.reducer;
