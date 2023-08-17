import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_6D35eeBgJRNGSUHIpiaVd53mycaC97cGDb6ptqAyr8ZH19nWNbfQQLBrGlwPj2PM';

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(BASE_URL).then(response => response.data);
}

function fetchCatByBreed(breedId) {
  const SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';

  return axios
    .get(SEARCH_URL, {
      params: {
        breed_ids: breedId,
      },
    })
    .then(response => response.data[0]);
}

export { fetchBreeds, fetchCatByBreed };
