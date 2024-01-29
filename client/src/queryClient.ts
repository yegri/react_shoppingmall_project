import request, { RequestDocument } from "graphql-request";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";

// any 타입 미리 만들어줌
type AnyOBJ = { [key: string]: any };

// Create a client
export const getClient = (() => {
  let client: QueryClient | null = null;

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            // 캐시타임 : 이 시간 안에는 다시 상세페이지 들어가도 요청 안 함
            cacheTime: Infinity,
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

// 기본 url
const BASE_URL = import.meta.env.VITE_SERVER_URL as string;

export const graphqlFetcher = <T>(query: RequestDocument, variables = {}) =>
  request<T>(`${BASE_URL}/graphql`, query, variables, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": BASE_URL,
  });

// 쿼리 키 만들기
export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
