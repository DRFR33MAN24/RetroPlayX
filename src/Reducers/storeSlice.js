import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {_getStoreGames} from '../api/storeService';
import {getUser} from './authSlice';
export const fetchStore = createAsyncThunk(
  'store/fetchStore',
  async (offset, {rejectWithValue}) => {
    try {
      const user = await getUser();

      const response = await _getStoreGames({
        offset: offset * 10,
        token: user.token,
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

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    games: [],
    total_games: 0,
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
        state.offers = state.offers.concat(action.payload.rows);
        state.total_games = action.payload.count;
        state.offset += 10;
      })
      .addCase(fetchStore.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default storeSlice.reducer;
