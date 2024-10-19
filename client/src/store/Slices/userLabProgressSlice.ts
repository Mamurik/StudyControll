import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserLabProgress } from "../../API/api";

interface userLabProgressState {
    progresses:IUserLabProgress[]
}
const initialState:userLabProgressState={
    progresses:[]
}
const userLabProgressSlice = createSlice({
    name:'progress',
    initialState,
    reducers:{
        setUserLabProgress:(state,action:PayloadAction<IUserLabProgress[]>)=>{
            state.progresses = action.payload
        }
    }
})

export const {setUserLabProgress} = userLabProgressSlice.actions

export default userLabProgressSlice.reducer