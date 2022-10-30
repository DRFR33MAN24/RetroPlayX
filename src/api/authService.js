import config from '../config';
export const _login = async loginInfo => {
  try {
    const response = await fetch(`${config.backendServer}/api/authUser/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginInfo),
    });
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
export const _reloadUser = async (credentails, deviceToken) => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/authUser/loadUser`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': credentails.token,
        },
        body: JSON.stringify({deviceToken: deviceToken}),
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

export const _loginGoogle = async loginInfo => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/authUser/loginGoogle`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
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

export const _getOffers = async (data, token) => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/offers/getOffers`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(data),
      },
    );
    const offers = await response.json();
    return offers;
  } catch (error) {
    if (!error.msg) {
      throw {msg: 'connection error'};
    } else {
      throw error;
    }
  }
};

export const _register = async registerInfo => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/authUser/register`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInfo),
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
