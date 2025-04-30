import { createSlice } from "@reduxjs/toolkit";

const initialState = { subscriptions: [] };

const subscriptionsSlice = createSlice({
	name: "subscriptions",
	initialState,
	reducers: {
		load(state, action) {
			state.subscriptions = action.payload.data;
		},
		add(state, action) {
			state.subscriptions.push(action.payload);
		},
		remove(state, action) {			
            state.subscriptions = state.subscriptions.filter((sub) => sub.memberId !== action.payload);
        },
		update(state, action) {
			action.payload.forEach((member) => {		
				const index = state.subscriptions.findIndex((sub) => sub.memberId === member.memberId);
				state.subscriptions[index] = member;
			});
		}
	},
});

export const subscriptionsActions = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
