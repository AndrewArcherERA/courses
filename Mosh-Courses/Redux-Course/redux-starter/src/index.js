import * as projectActions from "./store/projects";
import * as bugActions from "./store/bugs";
import configureStore from "./store/configureStore";
import * as teamMemberActions from "./store/teamMembers";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
    console.log("Strore changed", store.getState());
});

store.dispatch(projectActions.ADD_PROJECT({ name: "First Project" }));
store.dispatch(bugActions.ADD_BUG({ description: "Bug1" }));
store.dispatch(bugActions.ADD_BUG({ description: "Bug2" }));
store.dispatch(bugActions.ADD_BUG({ description: "Bug3" }));
store.dispatch(
    teamMemberActions.CREATE_TEAM_MEMBER({
        name: "Andrew Archer",
        position: "Jr Backend Developer",
    })
);
store.dispatch(teamMemberActions.ASSIGN_BUG({ id: 1, bugId: 1 }));
store.dispatch(teamMemberActions.ASSIGN_BUG({ id: 1, bugId: 3 }));
console.log(teamMemberActions.getMemberBugs(store.getState(), 1));
store.dispatch(bugActions.RESOLVE_BUG({ id: 1 }));
store.dispatch(teamMemberActions.UNASSIGN_BUG({ id: 1, bugId: 1 }));

console.log(store.getState());
