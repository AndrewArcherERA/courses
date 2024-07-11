import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { db } from "./api/firebase-config";
import {
    collection,
    doc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

function App() {
    const [smurfs, setSmurfs] = useState();
    const [display, setDisplay] = useState(false);

    async function getSmurfs() {
        const snapShot = await getDocs(collection(db, "smurfs"));
        const docs = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setSmurfs(docs);
        setDisplay(true);
    }

    useEffect(() => {
        getSmurfs();
    }, []);

    return (
        <div className='App'>
            <header className='App-header'>
                {display ? (
                    smurfs.map((doc) => {
                        return (
                            <>
                                <p>{doc.id}</p>
                                <p>{doc.age}</p>
                                <p>{doc.name}</p>
                            </>
                        );
                    })
                ) : (
                    <div></div>
                )}
            </header>
        </div>
    );
}

export default App;
