import { useInfiniteQuery, useQuery } from "react-query";

import { useCallback, useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import GET_PRODUCTS, { Products } from "../../../graphql/products";
import { QueryKeys, graphqlFetcher } from "../../../queryClient";
import AddForm from "./addForm";
import AdminList from "./list";

const AdminIndex = () => {
  // 상품 수정
  const [editingIndex, setEditigIndex] = useState<number | null>(null);

  // 무한 스크롤을 위해
  const fetchMoreRef = useRef<HTMLDivElement>(null);
  const intersecting = useInfiniteScroll(fetchMoreRef);

  // 데이터 가져오기, type 정의
  const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery<Products>(
      [QueryKeys.PRODUCTS, "admin"],
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

  const startEdit = (index: number) => () => setEditigIndex(index);
  const doneEdit = () => () => setEditigIndex(null);

  return (
    <div>
      <AddForm />

      <AdminList
        list={data?.pages || []}
        editingIndex={editingIndex}
        startEdit={startEdit}
        doneEdit={doneEdit}
      />

      <div ref={fetchMoreRef} />
    </div>
  );
};

export default AdminIndex;
