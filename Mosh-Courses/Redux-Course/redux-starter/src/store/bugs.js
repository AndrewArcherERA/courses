import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
let lastId = 0;

const slice = createSlice({
    name: "bugs",
    initialState: [],
    reducers: {
        ADD_BUG: (bugs, action) => {
            bugs.push({
                id: ++lastId,
                description: action.payload.description,
                resolved: false,
            });
        },

        RESOLVE_BUG: (bugs, action) => {
            const index = bugs.findIndex((bug) => bug.id === action.payload.id);
            bugs[index].resolved = true;
        },

        REMOVE_BUG: (bugs, action) => {
            return bugs.filter((bug) => bug.id !== action.payload.id);
        },
    },
});

export const { ADD_BUG, REMOVE_BUG, RESOLVE_BUG } = slice.actions;
export default slice.reducer;
export const getUnresolvedBugs = createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => !bugs.resolved)
);

// Action Creators
// export const addBug = createAction("ADD_BUG");
// export const removeBug = createAction("REMOVE_BUG");
// export const resolveBug = createAction("RESOLVE_BUG");

// Reducer

// Create Reducer way
// export default createReducer([], {
//     [addBug.type]: (bugs, action) => {},
//     [resolveBug.type]: (bugs, action) => {
//         const index = bugs.findIndex((bug) => bug.id === action.payload.id);
//         bugs[index].resolved = true;
//     },
//     [removeBug.type]: (bugs, action) => {
//         return bugs.filter((bug) => bug.id !== action.payload.id);
//     },
// });

// Basic Redux Way
// function reducer(state = [], action) {
//     switch (action.type) {
//         case addBug.type:
//             return [
//                 ...state,
//                 {
//                     id: ++lastId,
//                     description: action.payload.description,
//                     resolved: false,
//                 },
//             ];
//         case removeBug.type:
//             return state.filter((bug) => bug.id !== action.payload.id);
//         case resolveBug.type:

//         default:
//             return state;
//     }
// }
