import { AxiosRequestHeaders } from "axios";
type QueryParams = Record<string, any>;
interface RequestOptions {
    headers?: AxiosRequestHeaders;
    data?: any;
    params?: QueryParams;
}
export declare const post: (endpoint: string, options?: RequestOptions) => Promise<any>;
export {};
