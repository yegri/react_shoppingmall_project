import { useInfiniteQuery, useQuery } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";

import GET_PRODUCTS, { Products } from "../../graphql/products";
import ProductList from "../../assets/components/product/list";
import { useCallback, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../assets/hooks/useInfiniteScroll";
import ProductItem from "../../assets/components/product/item";

const ProductsListPage = () => {
  // 무한 스크롤을 위해
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreRef);

  // 데이터 가져오기, type 정의
  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      [QueryKeys.PRODUCTS, "products"],
      ({ pageParam = "" }) =>
        graphqlFetcher<Products>(GET_PRODUCTS, { cursor: pageParam }),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.products.at(-1)?.id;
        },
      }
    );

  useEffect(() => {
    if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage)
      return;

    fetchNextPage();
  }, [intersecting]);

  // data : {
  //   pages : [
  //     {products : [...]},
  //     {products : [...]}
  //   ],
  //   pageParams : [undefined, ...]
  // }

  // 방법1. map => map
  // 방법2. data.pages.flatMap(page => page.products) => [{},{},{}]

  /**
   * 전통적인 방식
      - scrollTop + window.clientHeight 등을 이용해서 정말 끝에 도달했는지 계산
      - eventHandler (scorll) => 감시. throttle / debounce -> 쓰레드 메모리를 차지하고 성능에도 좋지 않음
   * 새로운방식
      - intersectionObserver
      - 이벤트 등록 X. 브라우저에서 제공하는 별개의 감시자. 성능탁월
   */

  return (
    <div>
      <h2>상품목록</h2>

      <ProductList list={data?.pages || []} />

      <div ref={fetchMoreRef} />
    </div>
  );
};

export default ProductsListPage;
