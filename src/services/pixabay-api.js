import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '23504459-8998d3c986a45c76e9c9f5239';
axios.defaults.params = {
  key: API_KEY,
};

export const getSearchedImage = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `/?q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`,
    );
    const data = response.data;
    return data;
  } catch (e) {
    console.log(e);
  } finally {
    //
  }
};
