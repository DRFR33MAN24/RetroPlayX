import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {_getMyGames} from '../api/myGameService';

//import {_getNotifications} from '../api/notificationService';
import {getUser} from './authSlice';

export const loadGames = createAsyncThunk(
  'downloads/loadGames',
  async (arg, {rejectWithValue}) => {
    try {
      //const games = await _getMyGames();
      return [
        {
          id: '1',
          name: 'Super mario Bros',
          image: 'https://picsum.photos/id/1/200',
          platform: 'NES',
        },
        {
          id: '2',
          name: 'Contra',
          image: 'https://picsum.photos/id/1/200',
          platform: 'NES',
        },
        {
          id: '3',
          name: 'Adventure Island',
          image: 'https://picsum.photos/id/1/200',
          platform: 'NES',
        },
        {
          id: '4',
          name: 'GTA 2',
          image: 'https://picsum.photos/id/1/200',
          platform: 'PS1',
        },
        {
          id: '5',
          name: 'GTA 2',
          image: 'https://picsum.photos/id/1/200',
          platform: 'PS1',
        },
        {
          id: '6',
          name: 'GTA 2',
          image: 'https://picsum.photos/id/1/200',
          platform: 'PS1',
        },
        {
          id: '7',
          name: 'GTA 2',
          image: 'https://picsum.photos/id/1/200',
          platform: 'PS1',
        },
        {
          id: '8',
          name: 'GTA 2',
          image: 'https://picsum.photos/id/1/200',
          platform: 'PS1',
        },
      ];
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const myGames = createSlice({
  name: 'myGames',
  initialState: {
    myGames: [],

    status: 'idle',
    errors: {},
  },
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadGames.pending, (state, action) => {
        state.status = 'starting';
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.myGames = action.payload;
      })
      .addCase(loadGames.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default myGames.reducer;
