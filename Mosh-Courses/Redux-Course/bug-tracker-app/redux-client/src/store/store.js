import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import userReducer from "./user";

const rootReducer = combineReducers({
    bugs: bugsReducer,
    projects: projectsReducer,
    user: userReducer,
});

export const store = configureStore({ reducer: rootReducer });
