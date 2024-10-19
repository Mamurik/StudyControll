import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILab } from "../../API/api";
interface labState {
    labs:ILab[]
}
const initialState: labState ={
    labs:[]
}
const labSlice = createSlice({
    name:'lab',
    initialState,
    reducers:{
        setLabs:(state,action:PayloadAction<ILab[]>)=>{
            state.labs = action.payload
        }
    }
})
export const {setLabs} = labSlice.actions
export default labSlice.reducer