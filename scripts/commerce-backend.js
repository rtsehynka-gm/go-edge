async function fetchQuery(query, variables, GET = true, token = false) {
  const config = getConfig();
  const targetURL = config.magento.url;
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
    Accept: 'application/json',
    Host: targetURL.host,
  };

  if (config.magento.store) {
    headers.store = config.magento.store;
  }

  console.log('Fetching query: %s', query);
  if (GET) {
    const params = new URLSearchParams({
      query,
      variables: JSON.stringify(variables),
    });
    return fetch(
      `${config.magento.url}?${params.toString()}`,
      { headers },
    );
  }

  return fetch(targetURL.toString(), {
    agent: 'https:',
    body: JSON.stringify({ query }),
    headers,
    method: 'POST',
  })
    .then((result) => {
      console.log('Result received');
      console.log('Status: %s', result.status);

      return result.json();
    })
    .catch((err) => {
      console.log('Error received: %s', err);

      console.error(err);

      throw err;
    })
    .then((json) => {
      if (json && json.errors && json.errors.length > 0) {
        return Promise.reject(
          new Error(
            `${json.errors[0].message
            } (... ${json.errors.length} errors total)`,
          ),
        );
      }

      return json.data;
    });
}

function getConfig() {
  return {
    magento: {
      url: 'https://pwadev.gomage.dev/graphql',
      store: 'default',
    },
  };
}

export {
  fetchQuery,
};
