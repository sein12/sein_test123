import React from "react";

const RejectButton = ({ personId }: { personId: string }) => {
  const handleReject = () => {
    // 거절 로직 처리
    // 부모로부터 전달받은 reject 기능을 호출
    // 예를 들어, Page 컴포넌트에서 handleReject를 props로 받아 실행
  };

  return <button onClick={handleReject}>거절</button>;
};

export default RejectButton;
