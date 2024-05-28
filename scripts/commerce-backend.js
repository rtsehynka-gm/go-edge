async function checkApolloCache(client, query) {
  try {
    const cachedResponse = await client.query({
      query,
      fetchPolicy: 'cache-only', // Запитати тільки кеш, не робити запит на сервер
    });
    return cachedResponse;
  } catch (error) {
    console.error('Error checking Apollo cache:', error);
    return null;
  }
}

/**
 *
 * @param query
 * @param method
 * @returns {Promise<*>}
 */
async function useQuery(query, method = 'GET') {
  const config = getConfig();
  // Створення ApolloClient
  const { ApolloClient, InMemoryCache, HttpLink } = await import('@apollo/client/core');
  const fetch = (await import('axios')).default;
  const params = query.loc ? query.loc.source.body : query;
  const uri = method === 'GET' ? `${config.magento.url}?query=${params.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ').replace(/\s\s+/g, ' ')}` : config.magento.url;
  const { data } = await fetch.get(uri);
  const client = new ApolloClient({
    link: new HttpLink({
      uri, // URL
      fetch,
      useGETForQueries: method === 'GET',
    }),
    cache: new InMemoryCache(),
  });
  return data;
  // return cached response if found
  const cachedResponse = await checkApolloCache(client, query);
  if (cachedResponse?.data.length > 0) {
    console.log('Cached response found:', cachedResponse);
    return cachedResponse;
  }

  // make the request
  /* const data = await client.query({
    query,
  }); */

  return data;
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
  useQuery,
};
