import axios, { AxiosInstance } from 'axios';

export interface IParamObject {
  [key: string]: string | string[] | number | boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageSize: number;
  page: number;
}

export class HttpClient {
  private axiosClient: AxiosInstance;

  constructor(private backendUrl: string) {
    this.axiosClient = axios.create({
      baseURL: backendUrl + '/v1',
    });
  }

  setAuthorizationToken(token: string) {
    this.axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  disposeAuthorizationToken() {
    delete this.axiosClient.defaults.headers.common.Authorization;
  }

  async get(url: string, params?: IParamObject, allBody = false) {
    return await this.axiosClient
      .get(url, {
        params,
      })
      .then((response) => (allBody ? response.data : response.data.data));
  }

  async post(url: string, body = {}) {
    return await this.axiosClient.post(url, body).then((response) => response.data.data);
  }

  async patch(url: string, body = {}) {
    return await this.axiosClient.patch(url, body).then((response) => response.data.data);
  }
}
