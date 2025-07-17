import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import { createPerson } from "../api/personApi";
import type { Person } from "../types/index";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function RegisterModal({
  isOpen,
  onClose,
  onSuccess,
}: RegisterModalProps) {
  const [formData, setFormData] = useState<Omit<Person, "id">>({
    name: "",
    phone: "",
    color: "",
    gubun: "",
    rank: "",
    sosok: "",
  });

  const handleChange = (key: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
      ...(key === "gubun" && { rank: "" }),
    }));
  };

  const handleSubmit = async () => {
    await createPerson(formData);
    onSuccess();
  };

  const rankOptionsMap: Record<string, { label: string; value: string }[]> = {
    gunin: [
      { label: "소령", value: "소령" },
      { label: "중령", value: "중령" },
      { label: "대령", value: "대령" },
    ],
    gongmuwon: [
      { label: "1급", value: "1급" },
      { label: "2급", value: "2급" },
      { label: "3급", value: "3급" },
    ],
  };
  const rankOptions = rankOptionsMap[formData.gubun] || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle>인적 정보 등록</DialogTitle>
          <DialogDescription>새로운 인원을 등록하세요.</DialogDescription>
        </DialogHeader>
        <div className="grid sm:grid-cols-4 gap-6 px-6 py-4">
          {/* 이름, 전화번호, 색, 구분, 계급, 소속 부대 입력 UI (기존 FormModal 내용) */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
