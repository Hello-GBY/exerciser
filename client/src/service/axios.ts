import axios from "axios";
import { ElMessage } from "element-plus";
import type { AxiosInstance } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
const BASE_URL = "http://127.0.0.1:9008";
// 定义拦截器钩子
interface InterceptorsHooks<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  responseInterceptors?: (res: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}

interface MyAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: InterceptorsHooks<T>;
}

// 响应拦截 (服务器正常返回了数据， 20X)

// 统一封装axios
class MyRequest {
  instance: AxiosInstance; // axios 实例

  constructor(config: MyAxiosRequestConfig) {
    this.instance = axios.create(config); // 初始化_创建axios实例

    // 默认拦截器配置（必须执行）
    // request:
    this.instance.interceptors.request.use(
      (config: any) => {
        return config;
      },
      (err) => {
        ElMessage({
          message: "服务响应失败，请查看服务是否启动！",
          type: "warning",
        });
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        ElMessage({
          message: "服务响应失败！请查看服务是否启动.",
          type: "warning",
        });
        return err;
      }
    );
  }

  request<T>(config: MyAxiosRequestConfig<T>): Promise<T> {
    return this.instance.request<never, T>(config);
  }

  get<T = any>(config: MyAxiosRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }
  post<T = any>(config: MyAxiosRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  delete<T = any>(config: MyAxiosRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  put<T = any>(config: MyAxiosRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }
  patch<T = any>(config: MyAxiosRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: 10000,
});
export default myRequest;
// export default MyRequest;
