import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {_getNotifications} from '../api/notificationService';
import {getUser} from './authSlice';
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (offset, {rejectWithValue}) => {
    try {
      const user = await getUser();
      const response = await _getNotifications({
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
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    total_notifications: 0,
    offset: 0,
    status: 'idle',
    errors: {},
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.total_notifications = action.payload.length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default notificationsSlice.reducer;
