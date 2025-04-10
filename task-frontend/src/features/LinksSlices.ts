import {createSlice} from "@reduxjs/toolkit";
import {createLink, fetchAllLinks} from "./LinkThunks.ts";
import {Link} from "../types";
import {RootState} from "../app/store.ts";

interface LinksState {
    items: Link | null;
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: LinksState = {
    items: null,
    fetchLoading: false,
    createLoading: false,
};

export const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLinks.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllLinks.fulfilled, (state, {payload: links}) => {
                state.items = links;
                state.fetchLoading = false;
            })
            .addCase(createLink.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(createLink.fulfilled, (state) => {
                state.fetchLoading = false;
            })
    }
});

export const linksReducer = linksSlice.reducer;

export const selectLinks = (state: RootState) => state.links.items;
export const selectLinksLoading = (state: RootState) => state.links.fetchLoading;