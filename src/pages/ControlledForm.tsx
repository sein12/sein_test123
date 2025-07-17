import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../components/ui/select";

const emailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function ControlledForm() {
  const [form, setForm] = useState({
    email: "",
    role: "", // shadcn/ui Select
    department: "", // HTML select
  });
  const [touched, setTouched] = useState({
    email: false,
    role: false,
    department: false,
  });

  // 각 필드의 유효 여부
  const isEmailValid = emailPattern.test(form.email);
  const isRoleValid = form.role !== "";
  const isDeptValid = form.department !== "";

  // 전체 폼 유효 여부
  const isFormValid = isEmailValid && isRoleValid && isDeptValid;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    alert("폼 제출 성공!");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 이메일 입력 */}
      <div style={{ marginBottom: 16 }}>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && !isEmailValid && (
          <p style={{ color: "red", marginTop: 4 }}>
            유효한 이메일을 입력하세요.
          </p>
        )}
      </div>

      {/* 역할 선택: shadcn/ui Select */}
      <div style={{ marginBottom: 16 }}>
        <Label htmlFor="role">역할 선택</Label>
        <Select
          name="role"
          value={form.role}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, role: value }))
          }
        >
          <SelectTrigger
            id="role"
            onBlur={() => setTouched((prev) => ({ ...prev, role: true }))}
            className="w-full"
          >
            <SelectValue placeholder="— 선택하세요 —" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>역할</SelectLabel>
              <SelectItem value="admin">관리자</SelectItem>
              <SelectItem value="user">일반 사용자</SelectItem>
              <SelectItem value="guest">게스트</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {touched.role && !isRoleValid && (
          <p style={{ color: "red", marginTop: 4 }}>역할을 선택해주세요.</p>
        )}
      </div>

      {/* 부서 선택 (HTML select) */}
      <div style={{ marginBottom: 16 }}>
        <Label htmlFor="department">부서 선택</Label>
        <select
          id="department"
          name="department"
          value={form.department}
          onChange={handleChange}
          onBlur={handleBlur}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="" disabled>
            — 선택하세요 —
          </option>
          <option value="sales">영업부</option>
          <option value="dev">개발부</option>
          <option value="design">디자인부</option>
        </select>
        {touched.department && !isDeptValid && (
          <p style={{ color: "red", marginTop: 4 }}>부서를 선택해주세요.</p>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button type="submit" disabled={!isFormValid}>
        제출
      </Button>
    </form>
  );
}
