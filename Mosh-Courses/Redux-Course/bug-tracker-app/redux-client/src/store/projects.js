import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { db } from "../api/firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const getProjects = createAsyncThunk(
    "projects/getProjects",
    async () => {
        const snapShot = await getDocs(collection(db, "projects"));
        const docs = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return docs;
    }
);

export const addProject = createAsyncThunk(
    "projects/addProject",
    async (data) => {
        const { name } = data;
        const docRef = await addDoc(collection(db, "projects"), {
            name: name,
        });
        return {
            id: docRef.id,
            name: name,
        };
    }
);

const slice = createSlice({
    name: "projects",
    initialState: {
        list: [],
        currentProject: null,
        loading: false,
        error: null,
    },
    reducers: {
        SELECT_PROJECT: (projects, action) => {
            projects.currentProject = action.payload.p_id;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProject.pending, (state) => {})
            .addCase(addProject.fulfilled, (state, action) => {
                state.loading = false;
                state.list = [...state.list, action.payload];
            })
            .addCase(addProject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { SELECT_PROJECT } = slice.actions;

export default slice.reducer;
