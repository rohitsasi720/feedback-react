import { createSlice } from '@reduxjs/toolkit';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        entry: [],
    },
    reducers: {
        addFeedback(state, action) {
            state.entry.push(action.payload);
        },
    },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;