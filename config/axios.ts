import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "axios";
import { signOut } from "next-auth/client";

export interface CustomAxiosRequest<T> extends AxiosRequestConfig {
  token: string;
  data?: Partial<T>;
  params?: T;
}

export const callApi = async <T>(
  requestConfig: CustomAxiosRequest<T>
): Promise<AxiosResponse<T>> => {
  const headers = {
    "Content-Type": "application/json",
    authorization: `bear ${requestConfig.token}`,
  };

  const newRequestConfig: AxiosRequestConfig = {
    ...requestConfig,
    baseURL: "/",
    headers: { ...requestConfig.headers, ...headers },
  };

  try {
    const response = await axios(newRequestConfig);
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      await signOut({
        redirect: false,
      });
      window.location.replace("/signin");
    }
  }
};
