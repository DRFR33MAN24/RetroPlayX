import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {_getOffers} from '../api/offersService';
import {getUser} from './authSlice';
export const fetchOffers = createAsyncThunk(
  'offers/fetchOffers',
  async (offset, {rejectWithValue}) => {
    try {
      const user = await getUser();

      const response = await _getOffers({
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

const offersSlice = createSlice({
  name: 'offers',
  initialState: {
    offers: [],
    total_offers: 0,
    offset: 0,
    status: 'idle',
    errors: {},
  },
  reducers: {
    setOffers: (state, action) => {
      state.offers = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOffers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = state.offers.concat(action.payload.rows);
        state.total_offers = action.payload.count;
        state.offset += 10;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default offersSlice.reducer;
