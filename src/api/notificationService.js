import config from '../config';
export const _getNotifications = async fetchData => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/users/notifications?offset=${fetchData.offset}`,
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
