export const fetchPeople = async () => {
  const response = await fetch("/api/people");
  return await response.json();
};

export const rejectPerson = async (id: string) => {
  await fetch(`/api/people/${id}/reject`, { method: "PATCH" });
};

export const fixPerson = async (id: string) => {
  await fetch(`/api/people/${id}/fix`, { method: "PATCH" });
};

export const reSelectPeople = async () => {
  await fetch("/api/people/reselect", { method: "POST" });
};
