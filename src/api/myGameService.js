import {getFileNameAndExtension} from '../utility';
import * as RNFS from 'react-native-fs';
export const _getMyGames = async () => {
  try {
    const files = await RNFS.readDir(
      RNFS.ExternalStorageDirectoryPath + '/Android/data/com.retroplay/files',
    );
    const games = files.map(file => getFileNameAndExtension(file));

    return games;
  } catch (error) {
    if (!error.msg) {
      throw {msg: 'load games error'};
    } else {
      throw error;
    }
  }
};
