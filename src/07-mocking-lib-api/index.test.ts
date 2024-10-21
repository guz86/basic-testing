// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const relativePath = '/path';
  const mockedData = { data: 'mocked data' };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockedData),
    });
  });

  test('should create instance with provided base url', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    expect(result).toEqual(mockedData.data);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(mockedData.data);
  });
});
