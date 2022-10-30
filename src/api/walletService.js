import config from '../config';
export const _getTransactions = async fetchData => {
  try {
    const response = await fetch(
      `${config.backendServer}/api/users/transactions?offset=${fetchData.offset}`,
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
export const _submitPayment = async ({paymentDetails, token}) => {
  try {
    const response = await fetch(`${config.backendServer}/api/users/withdraw`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-auth-token': token,
      },
      body: JSON.stringify({...paymentDetails}),
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
