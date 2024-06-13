import { createSlice } from "@reduxjs/toolkit";

let lastID = 0;

const slice = createSlice({
    name: "projects",
    initialState: [],
    reducers: {
        ADD_PROJECT: (projects, action) => {
            projects.push({
                id: ++lastID,
                name: action.payload.name,
            });
        },
    },
});

export const { ADD_PROJECT } = slice.actions;
export default slice.reducer;
