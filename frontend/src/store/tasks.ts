import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask } from "../App";


const tasksSlice = createSlice({
    name: 'tasks',
    initialState: <ITask[]>[],
    reducers: {
        addTask: ((state, action: PayloadAction<ITask>) => {
            const taskExists = state.some(task => task.id === action.payload.id);
            if (!taskExists) {
                return [...state, action.payload]
            }
        }),
        updateTask: ((state, action: PayloadAction<ITask>) => {
            return state.map(task => task.id === action.payload.id ? action.payload : task)
        }),
        deleteTask: ((state, action: PayloadAction<ITask>) => {
            return state.filter(task => task.id !== action.payload.id)
        })
    }
})

export const { addTask, updateTask, deleteTask, }  = tasksSlice.actions

export default tasksSlice.reducer