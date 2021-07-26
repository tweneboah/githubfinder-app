import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
};
export const fetchReposAction = createAsyncThunk(
  "repos/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos?per_page=700&sort=asc`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProfileAction = createAsyncThunk(
  "profile/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${user}`,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const reposSlices = createSlice({
  name: "repos",
  initialState: {},
  extraReducers: builder => {
    builder.addCase(fetchReposAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state, action) => {
      state.reposList = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchReposAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.reposList = undefined;
    });
    //Profile
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
      state.profile = undefined;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.profile = action?.payload;
      state.loading = false;
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loading = false;

      state.profile = undefined;
      state.error = action.payload;
    });
  },
});

export default reposSlices.reducer;
