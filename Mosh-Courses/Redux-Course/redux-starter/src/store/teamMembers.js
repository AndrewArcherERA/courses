import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
let lastId = 0;

const slice = createSlice({
    name: "teamMembers",
    initialState: [],
    reducers: {
        CREATE_TEAM_MEMBER: (team, action) => {
            team.push({
                id: ++lastId,
                name: action.payload.name,
                position: action.payload.position,
                bugIds: [],
            });
        },

        ASSIGN_BUG: (team, action) => {
            const memberIndex = team.findIndex(
                (teamMember) => teamMember.id === action.payload.id
            );
            if (!team[memberIndex].bugIds.includes(action.payload.bugId)) {
                team[memberIndex].bugIds.push(action.payload.bugId);
            } else return team;
        },

        UNASSIGN_BUG: (team, action) => {
            const memberIndex = team.findIndex(
                (teamMember) => teamMember.id === action.payload.id
            );
            const updatedIds = team[memberIndex].bugIds.filter(
                (bugId) => bugId !== action.payload.bugId
            );

            team[memberIndex].bugIds = updatedIds;
        },
    },
});

export const { CREATE_TEAM_MEMBER, ASSIGN_BUG, UNASSIGN_BUG } = slice.actions;
export default slice.reducer;

//Selectors

//Returns array of Bugs assigned to Team Member
export const getMemberBugs = createSelector(
    (state, id) => {
        const index = state.entities.teamMembers.findIndex(
            (member) => member.id === id
        );
        return {
            memberBugs: state.entities.teamMembers[index].bugIds,
            bugs: state.entities.bugs,
        };
    },
    ({ memberBugs, bugs }) => {
        const result = [];
        memberBugs.map((id) => {
            for (let i = 0; i < bugs.length; i++) {
                if (id === bugs[i].id) {
                    result.push(bugs[i]);
                    break;
                }
            }
        });
        return result;
    }
);
