import "./App.css";
import Projects from "./components/Projects";
import SignIn from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";
import BugList from "./components/BugList";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ProjectDashboard from "./pages/ProjectDashboard";

function ProtectedRoute({ user, redirectPath = "/" }) {
    if (!user) return <Navigate to={redirectPath} replace />;

    return <Outlet />;
}

function App() {
    const { data } = useSelector((state) => state.user);
    return (
        <>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route element={<ProtectedRoute user={data} />}>
                    <Route
                        path='/projectDashboard'
                        element={<ProjectDashboard />}
                    />
                    <Route path='/projects' element={<Projects />} />
                </Route>
                <Route path='*' element={<p>404 Error: Nothing here!</p>} />
            </Routes>
        </>
    );
}

export default App;
