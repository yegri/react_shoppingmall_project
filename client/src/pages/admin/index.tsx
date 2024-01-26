import { useInfiniteQuery, useQuery } from "react-query";
import { QueryKeys, graphqlFetcher } from "../../queryClient";

import GET_PRODUCTS, { Products } from "../../graphql/products";
import ProductList from "../../assets/components/product/list";
import { useCallback, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../assets/hooks/useInfiniteScroll";
import AdminItem from "../../assets/components/admin/item";
import AddForm from "../../assets/components/admin/addForm";

const AdminPage = () => {
  // 무한 스크롤을 위해
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreRef);

  // 데이터 가져오기, type 정의
  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      [QueryKeys.PRODUCTS, true],
      ({ pageParam = "" }) =>
        graphqlFetcher<Products>(GET_PRODUCTS, {
          cursor: pageParam,
          showDeleted: true,
        }),
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

  return (
    <div>
      <h2>관리자 - 상품목록</h2>

      <AddForm />

      <ProductList list={data?.pages || []} Item={AdminItem} />

      <div ref={fetchMoreRef} />
    </div>
  );
};

export default AdminPage;
