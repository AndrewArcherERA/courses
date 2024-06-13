import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    signInWithPopup,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
} from "firebase/auth";

export const signIn = createAsyncThunk("firebase/signIn", async (auth) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return {
        uid: result.user.uid,
        displayName: result.user.displayName,
    };
});

export const signOut = createAsyncThunk("firebase/signOut", async (auth) => {
    await firebaseSignOut(auth);
    return null;
});

const slice = createSlice({
    name: "user",
    initialState: {
        data: null,
        laoding: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(signOut.pending, (state) => {
                state.loading = true;
            });
    },
});

export default slice.reducer;

//Selectors

//Returns array of Bugs assigned to Team Member
// export const getMemberBugs = createSelector(
//     (state, id) => {
//         const index = state.entities.teamMembers.findIndex(
//             (member) => member.id === id
//         );
//         return {
//             memberBugs: state.entities.teamMembers[index].bugIds,
//             bugs: state.entities.bugs,
//         };
//     },
//     ({ memberBugs, bugs }) => {
//         const result = [];
//         memberBugs.map((id) => {
//             for (let i = 0; i < bugs.length; i++) {
//                 if (id === bugs[i].id) {
//                     result.push(bugs[i]);
//                     break;
//                 }
//             }
//         });
//         return result;
//     }
// );
