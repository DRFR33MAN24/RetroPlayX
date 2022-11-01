import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  _getGameDetails,
  _getGameScreenshots,
  _getGameTrailer,
  _getStoreGames,
} from '../api/storeService';
import { getUser } from './authSlice';
export const fetchStore = createAsyncThunk(
  'store/fetchStore',
  async (offset, { rejectWithValue }) => {
    try {
      // const user = await getUser();

      const response = await _getStoreGames({
        offset: '4',
        //   token: user.token,
      });
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getGameDetails = createAsyncThunk(
  'store/getGameDetails',
  async (id, { rejectWithValue }) => {
    try {
      // const user = await getUser();

      const response = await _getGameDetails(id);
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getGameScreenshots = createAsyncThunk(
  'store/getGameScreenshots',
  async (id, { rejectWithValue }) => {
    try {
      // const user = await getUser();

      const response = await _getGameScreenshots(id);
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getGameTrailer = createAsyncThunk(
  'store/getGameTrailer',
  async (id, { rejectWithValue }) => {
    try {
      // const user = await getUser();

      const response = await _getGameTrailer(id);
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    games: [],
    total_games: 0,
    game_detail: {},
    game_screen_shots: [],
    game_trailer: [],
    offset: 0,
    status: 'idle',
    errors: {},
  },
  reducers: {
    setGames: (state, action) => {
      state.games = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStore.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchStore.fulfilled, (state, action) => {
        // console.log('results', action.payload.results);
        //state.games = state.games.concat(action.payload.results);
        state.games = action.payload.results;
        state.total_games = action.payload.count;
        state.offset += 10;
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getGameDetails.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getGameDetails.fulfilled, (state, action) => {
        state.game_detail = action.payload;
      })
      .addCase(getGameDetails.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getGameTrailer.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getGameTrailer.fulfilled, (state, action) => {
        state.game_trailer = action.payload.results;
      })
      .addCase(getGameTrailer.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(getGameScreenshots.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getGameScreenshots.fulfilled, (state, action) => {
        state.game_screen_shots = action.payload.results;
      })
      .addCase(getGameScreenshots.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default storeSlice.reducer;
