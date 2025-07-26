import React, { useEffect, useState } from "react";
import {
  fetchPeople,
  rejectPerson,
  fixPerson,
  reSelectPeople,
} from "../api/personApi"; // API 호출 함수 예시
import Table from "./Table";
import RejectButton from "./RejectButton";
import FixButton from "./FixButton";
import ReSelectButton from "./ReSelectButton";

const Page = () => {
  const [people, setPeople] = useState<any[]>([]);

  useEffect(() => {
    const getPeople = async () => {
      const response = await fetchPeople(); // 명단 불러오기
      setPeople(response);
    };
    getPeople();
  }, []);

  const handleReject = async (id: string) => {
    await rejectPerson(id); // 거절 API 호출
    const updatedPeople = people.map((person) =>
      person.id === id ? { ...person, status: "거절됨" } : person
    );
    setPeople(updatedPeople); // UI에서 즉시 반영
  };

  const handleFix = async (id: string) => {
    await fixPerson(id); // FIX 상태로 업데이트 API 호출
    const updatedPeople = people.map((person) =>
      person.id === id
        ? { ...person, status: "선정됨", fixedState: "FIX" }
        : person
    );
    setPeople(updatedPeople); // UI에서 즉시 반영
  };

  const handleReSelect = async () => {
    await reSelectPeople(); // 새 명단 요청 API 호출
    const updatedPeople = await fetchPeople(); // 새 명단 불러오기
    setPeople(updatedPeople);
  };

  return (
    <div>
      <Table people={people} />
      <ReSelectButton onClick={handleReSelect} />
    </div>
  );
};

export default Page;
