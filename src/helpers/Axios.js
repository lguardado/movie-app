import Config from 'react-native-config';
import axios from 'axios';

const instance = axios.create({
  baseURL: Config.API_URL,
});
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export default instance;
