import config from '../config';
// import { request, gql } from 'graphql-request'
// const query = gql`
//   {
//     company {
//       ceo
//     }
//     roadster {
//       apoapsis_au
//     }
//   }
// `

// request('https://api.spacex.land/graphql/', query).then((data) => console.log(data))
export const _getStoreGames = async fetchData => {
  try {
    const response = await fetch(
      `${config.rawgServer}/games?` +
        new URLSearchParams({
          key: config.rawgKey,
          page_size: fetchData.offset,
          platforms: '79,49,167,107,117,74,26,8,9,15,27,17,105,83,24,43,28,12',
        }),
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();

    return json;
  } catch (error) {
    if (!error.msg) {
      throw {msg: 'connection error'};
    } else {
      throw error;
    }
  }
};
export const _getGameDetails = async id => {
  try {
    const response = await fetch(
      `${config.rawgServer}/games/${id}?` +
        new URLSearchParams({
          key: config.rawgKey,
        }),
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();

    return json;
  } catch (error) {
    if (!error.msg) {
      throw {msg: 'connection error'};
    } else {
      throw error;
    }
  }
};
export const _getGameScreenshots = async id => {
  try {
    const response = await fetch(
      `${config.rawgServer}/games/${id}/screenshots?` +
        new URLSearchParams({
          key: config.rawgKey,
        }),
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();

    return json;
  } catch (error) {
    if (!error.msg) {
      throw {msg: 'connection error'};
    } else {
      throw error;
    }
  }
};
export const _getGameTrailer = async id => {
  try {
    const response = await fetch(
      `${config.rawgServer}/games/${id}/movies?` +
        new URLSearchParams({
          key: config.rawgKey,
        }),
      {
        method: 'GET',

        headers: {
          Accept: 'application/json',
        },
      },
    );
    const json = await response.json();

    return json;
  } catch (error) {
    if (!error.msg) {
      throw {msg: 'connection error'};
    } else {
      throw error;
    }
  }
};
