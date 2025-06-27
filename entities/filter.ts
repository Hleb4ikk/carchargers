type FilterType = "select" | "range" | "boolean";

type FilterConfig = {
  key: string;
  label: string;
  type: FilterType;
  options?: string[];
  unit?: string;
};
