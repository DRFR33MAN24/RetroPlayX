import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {_getTransactions, _submitPayment} from '../api/walletService';
import {getUser} from './authSlice';
export const fetchTransactions = createAsyncThunk(
  'wallet/fetchTransactions',
  async (offset, {rejectWithValue}) => {
    try {
      const user = await getUser();
      const response = await _getTransactions({
        offset: offset,
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
export const submitPayment = createAsyncThunk(
  'wallet/submitPayment',
  async (paymentDetails, {rejectWithValue}) => {
    try {
      const user = await getUser();
      const response = await _submitPayment({
        paymentDetails: paymentDetails,
        token: user.token,
      });

      //console.log(response);
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    transactions: [],
    total_transactions: 0,
    offset: 0,
    status: 'idle',
    errors: {},
  },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.total_transactions = action.payload.length;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(submitPayment.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(submitPayment.fulfilled, (state, action) => {})
      .addCase(submitPayment.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default walletSlice.reducer;
