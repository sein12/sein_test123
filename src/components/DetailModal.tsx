import { Dialog } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useEffect, useState } from "react";
import { fetchPersonById, updatePerson, deletePerson } from "../api/personApi";
import type { Person } from "../types/index";

type DetailModalProps = {
  isOpen: boolean;
  id: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DetailModal({
  isOpen,
  id,
  onClose,
  onSuccess,
}: DetailModalProps) {
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    if (isOpen) fetchPersonById(id).then(setPerson);
  }, [isOpen, id]);

  const handleUpdate = async (updates: Partial<Person>) => {
    if (!person) return;
    await updatePerson(person.id, updates);
    onSuccess();
  };

  const handleDelete = async () => {
    if (!person) return;
    await deletePerson(person.id);
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Modal content: display person details and buttons for 수정/Delete -> invoke handleUpdate, handleDelete */}
    </Dialog>
  );
}
