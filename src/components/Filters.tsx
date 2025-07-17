import { Input } from "../components/ui/input";
import CustomSelect from "./CustomSelect";
import type { Filters } from "../types/index";
import { Button } from "./ui/button";

type FiltersProps = {
  filters: Filters;
  onFiltersChange: (name: keyof Filters, value: string) => void;
  onSearch: () => void;
};

export default function Filters({
  filters,
  onFiltersChange,
  onSearch,
}: FiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <Input
        placeholder="이름 검색..."
        value={filters.name}
        onChange={(e) => onFiltersChange("name", e.target.value)}
        className="max-w-sm"
      />
      <CustomSelect
        label="구분"
        value={filters.gubun}
        options={[
          { label: "전체", value: "" },
          { label: "군인", value: "gunin" },
          { label: "공무원", value: "gongmuwon" },
        ]}
        onChange={(value) => onFiltersChange("gubun", value)}
      />
      <Button onClick={onSearch}>검색</Button>
    </div>
  );
}
