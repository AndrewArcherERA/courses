import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBugs, addBug, removeBug, resolveBug } from "../store/bugs";

function BugList() {
    const { bugs, loading } = useSelector((state) => state.bugs);
    const { data } = useSelector((state) => state.user);
    const { currentProject } = useSelector((state) => state.projects);
    const dispatch = useDispatch();

    function handleDelete(e) {
        const id = e.target.value;
        dispatch(removeBug(id));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let desc = e.target[0].value;
        const obj = {
            desc: desc,
            uid: data.uid,
            p_id: currentProject,
        };
        dispatch(addBug(obj));
    }

    function handleResolve(e) {
        const obj = { id: e.target.id, resolved: e.target.value };
        dispatch(resolveBug(obj));
    }

    useEffect(() => {
        dispatch(getBugs(currentProject));
    }, []);
    return (
        <div>
            {!loading ? (
                bugs.map((bug) => {
                    return (
                        <div key={bug.id}>
                            <p>{bug.description}</p>
                            <button onClick={handleDelete} value={bug.id}>
                                X
                            </button>
                            <button
                                onClick={handleResolve}
                                value={bug.resolved}
                                id={bug.id}
                            >
                                {!bug.resolved ? "Resolve" : "Unresolve"}
                            </button>
                            <p>
                                Status:{" "}
                                {bug.resolved ? "Resolved" : "Unresolved"}
                            </p>
                        </div>
                    );
                })
            ) : (
                <p>Loading...</p>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='description'
                    name='description'
                />
                <button type='submit'>Create Bug</button>
            </form>
        </div>
    );
}

export default BugList;
