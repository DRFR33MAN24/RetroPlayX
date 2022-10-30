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
export const _getOffers = async fetchData => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/offers/getOffers?offset=${fetchData.offset}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': fetchData.token,
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
