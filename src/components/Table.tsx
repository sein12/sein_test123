import React, { useState } from "react";

interface FormData {
  email: string;
  phone: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
}

const emailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;

export default function ValidationForm() {
  const [form, setForm] = useState<FormData>({ email: "", phone: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  // 입력 변경 시 상태 업데이트와 간단 검증 실행
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // 즉시 검증
    let errorMsg = "";
    if (name === "email" && !emailPattern.test(value)) {
      errorMsg = "유효한 이메일 형식이 아닙니다.";
    }
    if (name === "phone" && !phonePattern.test(value)) {
      errorMsg = "전화번호는 010-1234-5678 형태여야 합니다.";
    }
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  // 최종 제출 시 한 번 더 검증
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    if (!emailPattern.test(form.email)) {
      newErrors.email = "유효한 이메일을 입력하세요.";
    }
    if (!phonePattern.test(form.phone)) {
      newErrors.phone = "유효한 전화번호를 입력하세요.";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 검증 통과!
      console.log("제출 데이터:", form);
      alert("제출 성공 🎉");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email">이메일</label><br />
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", padding: 8 }}
        />
        {errors.email && <p style={{ color: "red", margin: 4 }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="phone">전화번호</label><br />
        <input
          id="phone"
          name="phone"
          type="text"
          placeholder="010-1234-5678"
          value={form.phone}
          onChange={handleChange}
          style={{ width: "100%", padding: 8 }}
        />
        {errors.phone && <p style={{ color: "red", margin: 4 }}>{errors.phone}</p>}
      </div>

      <button type="submit" style={{ padding: "8px 16px" }}>제출</button>
    </form>
  );
}
