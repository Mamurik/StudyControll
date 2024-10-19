import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISubject } from "../../API/api";

interface subjectState{
    subjects:ISubject[]
}
const initialState:subjectState={
    subjects:[]
}
const subjectSlice = createSlice({
    name:'subject',
    initialState,
    reducers:{
        setSubject:(state,action:PayloadAction<ISubject[]>)=>{
            state.subjects = action.payload
        }
    }
})

export const {setSubject} = subjectSlice.actions

export default subjectSlice.reducer