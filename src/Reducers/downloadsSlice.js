import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import RNBackgroundDownloader from 'react-native-background-downloader';
//import {_getNotifications} from '../api/notificationService';
import {getUser} from './authSlice';
export const startDownload = createAsyncThunk(
  'downloads/startDownload',
  async (game, {rejectWithValue}) => {
    try {
      let task = RNBackgroundDownloader.download({
        id: game.id,
        url: game.rom_link,
        destination: `${RNBackgroundDownloader.directories.documents}/${game.id}`,
      })
        .begin(expectedBytes => {
          console.log(`Going to download ${expectedBytes} bytes!`);
          //setStatus()
        })
        .progress(percent => {
          console.log(`Downloaded: ${percent * 100}%`);
          //setProgress()
        })
        .done(() => {
          console.log('Download is done!');
          //setStatus()
        })
        .error(error => {
          console.log('Download canceled due to error: ', error);
          //setError()
        });

      return {
        game_id: game.id,
        task_id: task.id,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const pauseDownload = createAsyncThunk(
  'downloads/pauseDownload',
  async (game, {rejectWithValue}) => {
    try {
      let task = await RNBackgroundDownloader.checkForExistingDownloads();
      if (task[0].id) {
        task[0].pause();
      }
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const resumeDownload = createAsyncThunk(
  'downloads/resumeDownload',
  async (game, {rejectWithValue}) => {
    try {
      let task = await RNBackgroundDownloader.checkForExistingDownloads();
      if (task[0].id) {
        task[0].resume();
      }
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const stopDownload = createAsyncThunk(
  'downloads/stopDownload',
  async (game, {rejectWithValue}) => {
    try {
      let task = await RNBackgroundDownloader.checkForExistingDownloads();
      if (task[0].id) {
        task[0].stop();
      }
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const loadDownloads = createAsyncThunk(
  'downloads/loadDownloads',
  async (game, {rejectWithValue}) => {
    try {
      let task = await RNBackgroundDownloader.checkForExistingDownloads();
      if (task) {
        task
          .progress(percent => {
            console.log(`Downloaded: ${percent * 100}%`);
          })
          .done(() => {
            console.log('Downlaod is done!');
          })
          .error(error => {
            console.log('Download canceled due to error: ', error);
          });
      }
      return {
        game_id: game.id,
        task_id: task.id,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
const downloadsSlice = createSlice({
  name: 'downloads',
  initialState: {
    downloads: {},
    progress: '',
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
      .addCase(startDownload.pending, (state, action) => {
        state.status = 'starting';
      })
      .addCase(startDownload.fulfilled, (state, action) => {
        state.downloads = action.payload;
      })
      .addCase(startDownload.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(pauseDownload.pending, (state, action) => {
        state.status = 'pausing';
      })
      .addCase(pauseDownload.fulfilled, (state, action) => {
        //state.downloads = action.payload;
        state.status = 'paused';
      })
      .addCase(pauseDownload.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(resumeDownload.pending, (state, action) => {
        state.status = 'resuming';
      })
      .addCase(resumeDownload.fulfilled, (state, action) => {
        //state.downloads = action.payload;
        state.status = 'downloading';
      })
      .addCase(resumeDownload.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(stopDownload.pending, (state, action) => {
        state.status = 'stopping';
      })
      .addCase(stopDownload.fulfilled, (state, action) => {
        //state.downloads = action.payload;
        state.status = 'idle';
      })
      .addCase(stopDownload.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(loadDownloads.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loadDownloads.fulfilled, (state, action) => {
        state.downloads = action.payload;
        state.status = 'idle';
      })
      .addCase(loadDownloads.rejected, (state, action) => {
        state.errors = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
//export const {addCartItem, removeCartItem, decreaseItemQty} = cartSlice.actions;

export default downloadsSlice.reducer;
