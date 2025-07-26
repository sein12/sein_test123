import React from "react";

const ReSelectButton = ({ onClick }: { onClick: () => void }) => {
  return <button onClick={onClick}>새 명단 요청</button>;
};

export default ReSelectButton;
