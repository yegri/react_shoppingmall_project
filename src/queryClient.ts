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
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
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
const BASE_URL = "/";

// resetFetcher async로 요청
export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  // 메소드 타입 정의
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

  // url대신 path를 받음
  path: string;

  // post나 put의 경우엔 body가 필요하므로
  body?: AnyOBJ;

  // 파라미터
  params?: AnyOBJ;
}) => {
  try {
    // 기본 url + path
    let url = `${BASE_URL}${path}`;

    // RequestInit은 node에 기본적으로 정의되어 있음
    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Contnet-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

    // param이 오면
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }

    // body가 오면
    if (body) fetchOptions.body = JSON.stringify(body);

    // url와 옵션들 요청
    // 메서드와 path를 받아서 완성
    const res = await fetch(url, fetchOptions);

    // 받은 것을 json으로 바꾸기
    const json = await res.json();
    return json;

    // 에러 출력
  } catch (err) {
    console.error(err);
  }
};

// graphqlFetcher
export const graphqlFetcher = <T>(query: RequestDocument, variables = {}) =>
  request<T>(BASE_URL, query, variables);

// 쿼리 키 만들기
export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
};
