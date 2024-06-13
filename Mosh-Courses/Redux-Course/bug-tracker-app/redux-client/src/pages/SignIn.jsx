import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../api/firebase-config";
import { signIn, signOut } from "../store/user";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.user);

    function handleSignIn() {
        dispatch(signIn(auth));
    }
    useEffect(() => {
        if (data) navigate("/projects");
    }, [data]);

    function handleSignOut() {
        dispatch(signOut(auth));
    }

    return (
        <div>
            <button onClick={handleSignIn}>Sign In</button>

            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
}

export default SignIn;
