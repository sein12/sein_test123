import React from "react";

const FixButton = ({ personId }: { personId: string }) => {
  const handleFix = () => {
    // FIX 처리 로직
    // 부모로부터 전달받은 fix 기능을 호출
    // 예를 들어, Page 컴포넌트에서 handleFix를 props로 받아 실행
  };

  return <button onClick={handleFix}>선정됨</button>;
};

export default FixButton;
