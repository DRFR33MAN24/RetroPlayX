import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {_login, _register, _reloadUser, _loginGoogle} from '../api/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async value => {
  try {
    await AsyncStorage.setItem('@user', JSON.stringify(value));
  } catch (e) {
    throw {msg: 'Failed to clear user cred'};
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('@user');
    const user = JSON.parse(value);

    if (!user.user) {
      // value previously stored

      throw {msg: 'Login to continue'};
    } else {
      return user;
    }
  } catch (e) {
    throw e;
  }
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await _login(loginInfo);

      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const reloadUser = createAsyncThunk(
  'auth/reloadUser',
  async (data, {rejectWithValue}) => {
    try {
      const user = await getUser();
      const response = await _reloadUser(user, data);

      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (data, {rejectWithValue}) => {
    try {
      const response = await getUser();
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const logout = createAsyncThunk(
  'auth/logout',
  async (data, {rejectWithValue}) => {
    try {
      await storeUser({});
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const loginGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await _loginGoogle(loginInfo);
      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const register = createAsyncThunk(
  'auth/register',
  async (registerInfo, {rejectWithValue}) => {
    try {
      const response = await _register(registerInfo);

      if (response.msg) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
    authErrors: {},
    token: undefined,
    deviceToken: '',
    status: 'idle',
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // storeToken(action.payload.token);
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    clearAuthErrors: (state, action) => {
      state.authErrors = {};
    },
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log('login full', action.payload);

        state.user = action.payload.user;
        state.status = 'idle';
        state.token = action.payload.token;
        storeUser(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.authErrors = action.payload;
        state.user = {};
        state.token = '';
      })
      .addCase(register.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'idle';
        storeUser(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.authErrors = action.payload;
        state.user = {};
        state.token = '';
      })
      .addCase(loginGoogle.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = 'idle';
        state.token = action.payload.token;
        storeUser(action.payload);
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.authErrors = action.payload;
        state.user = {};
        state.token = '';
      })
      .addCase(loadUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'idle';
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.authErrors = action.payload;
        state.user = {};
        state.token = '';
      })
      .addCase(reloadUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(reloadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.status = 'idle';
        storeUser(action.payload);
      })
      .addCase(reloadUser.rejected, (state, action) => {
        //state.authErrors = action.payload;
        state.user = {};
        state.token = '';
      })
      .addCase(logout.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = {};
        state.token = '';
        state.status = 'idle';
      })
      .addCase(logout.rejected, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const {setErrors, setUser, setDeviceToken, clearAuthErrors} =
  authSlice.actions;

export default authSlice.reducer;
