import React from "react";
import RejectButton from "./RejectButton";
import FixButton from "./FixButton";

const Table = ({ people }: { people: any[] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {people.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.status || "상태 없음"}</td>
            <td>
              <RejectButton personId={person.id} />
              <FixButton personId={person.id} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
