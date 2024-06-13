import React, { useEffect } from "react";
import { addProject, getProjects, SELECT_PROJECT } from "../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Projects() {
    const dispatch = useDispatch();
    const { list } = useSelector((state) => state.projects);

    function handleCurrentProject(e) {
        let id = e.target.id;
        console.log(id);
        dispatch(SELECT_PROJECT({ p_id: id }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        let name = e.target[0].value;
        const obj = {
            name: name,
        };
        dispatch(addProject(obj));
    }

    useEffect(() => {
        dispatch(getProjects());
    }, []);
    return (
        <div>
            {list.map((project) => {
                return (
                    <Link key={project.id} to={"/projectDashboard"}>
                        <div>
                            <button
                                onClick={handleCurrentProject}
                                id={project.id}
                            >
                                {project.name}
                            </button>
                        </div>
                    </Link>
                );
            })}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='project name' />
                <button type='submit'>Create Project</button>
            </form>
        </div>
    );
}

export default Projects;
