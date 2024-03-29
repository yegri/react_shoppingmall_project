import { useRecoilState } from "recoil";
import checkedCartState from "../../../recoils/cart";
import WillPay from "../willPay";
import PaymentModal from "./modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { graphqlFetcher } from "../../../queryClient";
import { EXECUTE_PAY } from "../../../graphql/payment";

type PaymentInfos = string[];

const PaymentIndex = () => {
  const navigate = useNavigate();
  const [checkedCartData, setCheckedCartData] =
    useRecoilState(checkedCartState);

  const [modalShown, toggleModal] = useState(false);

  const { mutate: executePay } = useMutation((ids: PaymentInfos) =>
    graphqlFetcher(EXECUTE_PAY, { ids })
  );

  const showModal = () => {
    toggleModal(true);
  };

  // 결제진행!
  const proceed = () => {
    const ids = checkedCartData.map(({ id }) => id);
    executePay(ids, {
      onSuccess: () => {
        setCheckedCartData([]);
        alert("결제 완료되었습니다.");
        navigate("/products", { replace: true });
      },
    });
  };

  const cancel = () => {
    toggleModal(false);
  };

  return (
    <div>
      <WillPay submitTitle="결제하기" handleSubmit={showModal} />
      <PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
    </div>
  );
};

export default PaymentIndex;
