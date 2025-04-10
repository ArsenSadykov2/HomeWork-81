import {createAsyncThunk} from "@reduxjs/toolkit";

import {Link, LinkWithoutId} from "../types";
import axiosAPI from "../axiosApi.ts";

export const fetchAllLinks = createAsyncThunk<Link, void>(
    'links/fetchAllLinks',
    async () => {
        const response = await axiosAPI.get<Link>('/links');
        return response.data;
    }
);


export const createLink = createAsyncThunk<{ shortUrl: string }, LinkWithoutId>(
    'links/createLink',
    async (linkToAdd) => {
        const response = await axiosAPI.post('/links', linkToAdd);
        return response.data;
    }
);