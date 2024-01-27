import { useRecoilValue } from "recoil";
import checkedCartState from "../../../recoils/cart";
import ItemData from "../cart/itemData";
import { SyntheticEvent } from "react";

// 결제예정
const WillPay = ({
  submitTitle,
  handleSubmit,
}: {
  submitTitle: string;
  handleSubmit: (e: SyntheticEvent) => void;
}) => {
  // reduce로 체크된 상품데이터를 누적 합산한 값
  const checkedItems = useRecoilValue(checkedCartState);

  const totalPrice = checkedItems.reduce(
    (res, { product: { price, createdAt }, amount }) => {
      if (createdAt) res += price * amount;
      return res;
    },
    0
  );

  return (
    <div className="cart-willpay">
      <ul>
        {checkedItems.map(
          ({ product: { imageUrl, price, title, createdAt }, amount, id }) => (
            <li key={id}>
              <ItemData
                imageUrl={imageUrl}
                price={price}
                title={title}
                key={id}
              />
              <p>수량 : {amount}</p>
              <p>금액 : {price * amount}</p>
              {!createdAt && "품절된 상품입니다."}
            </li>
          )
        )}
      </ul>

      <p>총예상금액 : {totalPrice}</p>

      <button onClick={handleSubmit}>{submitTitle}</button>
    </div>
  );
};

export default WillPay;
