import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 70000,
  headers: {'x-api-key': 'test-api-key'}
});
