import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../api/firebase-config";

export const getBugs = createAsyncThunk("bugs/getBugs", async (p_id) => {
    const snapShot = await getDocs(collection(db, "bugs"));
    const docs = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return p_id ? docs.filter((bug) => bug.p_id == p_id) : docs;
});

export const addBug = createAsyncThunk("bugs/addBug", async (data) => {
    const { desc, p_id, uid } = data;
    const docRef = await addDoc(collection(db, "bugs"), {
        description: desc,
        resolved: false,
        uid: uid,
        p_id: p_id,
    });
    return {
        id: docRef.id,
        description: desc,
        resolved: false,
        uid: uid,
        p_id: p_id,
    };
});

export const removeBug = createAsyncThunk("bugs/removeBug", async (id) => {
    await deleteDoc(doc(db, "bugs", id));
    return id;
});

export const resolveBug = createAsyncThunk("bugs/resolveBug", async (data) => {
    const { id, resolved } = data;
    const resolvedBug = doc(db, "bugs", id);
    if (resolved === "true") await updateDoc(resolvedBug, { resolved: false });
    else await updateDoc(resolvedBug, { resolved: true });
    return id;
});

const slice = createSlice({
    name: "bugs",
    initialState: {
        bugs: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBugs.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBugs.fulfilled, (state, action) => {
                state.loading = false;
                state.bugs = action.payload;
            })
            .addCase(getBugs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addBug.pending, (state) => {})
            .addCase(addBug.fulfilled, (state, action) => {
                state.loading = false;
                state.bugs = [...state.bugs, action.payload];
            })
            .addCase(addBug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(removeBug.pending, (state) => {})
            .addCase(removeBug.fulfilled, (state, action) => {
                state.bugs = state.bugs.filter(
                    (bug) => bug.id != action.payload
                );
            })
            .addCase(removeBug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(resolveBug.pending, (state) => {})
            .addCase(resolveBug.fulfilled, (state, action) => {
                const index = state.bugs.findIndex(
                    (bug) => bug.id === action.payload
                );
                state.bugs[index].resolved = !state.bugs[index].resolved;
            })
            .addCase(resolveBug.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default slice.reducer;
export const getUnresolvedBugs = createSelector(
    (state) => state.bugs.bugs,
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
