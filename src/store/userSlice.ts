import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    user: {
        id: string;
        fullName: string;
        email: string;
    } | null;
    userToken: string | null;
}

const initialState: UserState = {
    user: null,
    userToken: null,
};

const UserSlice = createSlice({
    name: "scheditix",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState["user"]>) => {
            state.user = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.userToken = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
            state.userToken = null;
        },
    },
});

export const {setUser, setToken, logoutUser} = UserSlice.actions;

export default UserSlice.reducer;
