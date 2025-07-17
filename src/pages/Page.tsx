import React, { useState } from "react";

interface FormData {
  email: string;
  phone: string;
  date: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  date?: string;
}

// 이메일·전화번호 패턴은 이전 예시와 동일
const emailPattern = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
const phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;

// YYYY-MM-DD 형식, 월은 01~12, 일은 01~31까지 허용
const datePattern =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export default function ValidationForm() {
  const [form, setForm] = useState<FormData>({
    email: "",
    phone: "",
    date: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    let errorMsg = "";

    if (name === "email" && !emailPattern.test(value)) {
      errorMsg = "유효한 이메일 형식이 아닙니다.";
    }
    if (name === "phone" && !phonePattern.test(value)) {
      errorMsg = "전화번호는 010-1234-5678 형태여야 합니다.";
    }
    if (name === "date") {
      if (!datePattern.test(value)) {
        errorMsg = "날짜는 YYYY-MM-DD 형식이어야 합니다.";
      } else {
        // Regex 통과 후, 실제 존재하는 날짜인지 추가 체크
        const [y, m, d] = value.split("-").map(Number);
        const dt = new Date(y, m - 1, d);
        if (
          dt.getFullYear() !== y ||
          dt.getMonth() + 1 !== m ||
          dt.getDate() !== d
        ) {
          errorMsg = "존재하지 않는 날짜입니다.";
        }
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!emailPattern.test(form.email)) {
      newErrors.email = "유효한 이메일을 입력하세요.";
    }
    if (!phonePattern.test(form.phone)) {
      newErrors.phone = "유효한 전화번호를 입력하세요.";
    }
    if (!datePattern.test(form.date)) {
      newErrors.date = "날짜는 YYYY-MM-DD 형식이어야 합니다.";
    } else {
      const [y, m, d] = form.date.split("-").map(Number);
      const dt = new Date(y, m - 1, d);
      if (
        dt.getFullYear() !== y ||
        dt.getMonth() + 1 !== m ||
        dt.getDate() !== d
      ) {
        newErrors.date = "존재하지 않는 날짜입니다.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("제출 데이터:", form);
      alert("제출 성공 🎉");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      {/* 이메일 */}
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
        {errors.email && (
          <p style={{ color: "red", margin: 4 }}>{errors.email}</p>
        )}
      </div>

      {/* 전화번호 */}
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
        {errors.phone && (
          <p style={{ color: "red", margin: 4 }}>{errors.phone}</p>
        )}
      </div>

      {/* 날짜 */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="date">날짜</label><br />
        <input
          id="date"
          name="date"
          type="text"
          placeholder="2025-05-05"
          value={form.date}
          onChange={handleChange}
          style={{ width: "100%", padding: 8 }}
        />
        {errors.date && (
          <p style={{ color: "red", margin: 4 }}>{errors.date}</p>
        )}
      </div>

      <button type="submit" style={{ padding: "8px 16px" }}>
        제출
      </button>
    </form>
  );
}
