import { SyntheticEvent, createRef, useEffect, useRef, useState } from "react";
import { Cart } from "../../../graphql/cart";
import CartItem from "./item";
import { useRecoilState } from "recoil";
import checkedCartState from "../../../recoils/cart";
import WillPay from "../willPay";
import { useNavigate } from "react-router-dom";

const CartList = ({ items }: { items: Cart[] }) => {
  const navigate = useNavigate();

  // 체크된 요소의 상태
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);

  // 전체 폼 요소에 대한 참조
  const formRef = useRef<HTMLFormElement>(null);

  // 각 아이템 체크박스 요소에 대한 참조 배열
  const checkboxRefs = items.map(() => createRef<HTMLInputElement>());

  const [formData, setFormData] = useState<FormData>();

  // 개별 아이템 선택 시
  const setAllCheckedFromItems = () => {
    if (!formRef.current) return;

    // 현재 폼의 데이터를 FormData로 가져오기
    const data = new FormData(formRef.current);

    // 선택된 아이템의 개수 계산
    const selectedCount = data.getAll("select-item").length;

    // 개별 아이템의 체크박스가 변경되었을 때
    const allChecked = selectedCount === items.length;

    formRef.current.querySelector<HTMLInputElement>(
      ".cart_select-all"
    )!.checked = allChecked;
  };

  const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
    const allChecked = targetInput.checked;
    checkboxRefs.forEach((inputElem) => {
      inputElem.current!.checked = allChecked;
    });
  };

  // 전체 선택 핸들러 함수
  const handleCheckboxChanged = (e?: SyntheticEvent) => {
    if (!formRef.current) return;

    // 변경된 체크박스 요소 확인
    const targetInput = e?.target as HTMLInputElement;

    // 전체 선택 체크박스가 변경되었을 때
    if (targetInput && targetInput.classList.contains("cart_select-all")) {
      setItemsCheckedFromAll(targetInput);
    } else {
      setAllCheckedFromItems();
    }

    // 현재 폼의 데이터를 FormData로 가져오기
    const data = new FormData(formRef.current);
    setFormData(data);
  };

  const handleSubmit = () => {
    if (checkedCartData.length) {
      navigate("/payment");
    } else {
      alert("결제할 대상이 없어요");
    }
  };

  useEffect(() => {
    checkedCartData.forEach((item) => {
      const itemRef = checkboxRefs.find(
        (ref) => ref.current!.dataset.id === item.id
      );
      if (itemRef) itemRef.current!.checked = true;
    });
    handleCheckboxChanged();
  }, []);

  useEffect(() => {
    // 체크된 아이템을 식별하기 위해
    const checkedItems = checkboxRefs.reduce<Cart[]>((res, ref, i) => {
      if (ref.current!.checked) res.push(items[i]);
      return res;
    }, []);
    setCheckedCartData(checkedItems);
  }, [items, formData]);

  return (
    <div>
      {/* 폼 엘리먼트에 참조를 설정하고, 체크박스 변경 시 이벤트 핸들러를 호출 */}
      <form ref={formRef} onChange={handleCheckboxChanged}>
        <label>
          <input
            className="cart_select-all"
            type="checkbox"
            name="select-all"
          />
          전체선택
        </label>

        <ul className="cart">
          {items?.map((item: any, i) => (
            <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
          ))}
        </ul>
      </form>

      <WillPay submitTitle="결제창으로" handleSubmit={handleSubmit} />
    </div>
  );
};

export default CartList;
