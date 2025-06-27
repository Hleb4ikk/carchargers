import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUrlParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const getParam = (key: string): string | null => {
    return searchParams.get(key);
  };

  const getAllParams = (): Record<string, string[]> => {
    const result: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      result[key] = value.split(",").filter(Boolean);
    });
    return result;
  };

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const setMultipleParams = (updates: Record<string, string[]>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, values] of Object.entries(updates)) {
      if (values.length === 0) {
        params.delete(key);
      } else {
        params.set(key, values.join(","));
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return {
    getParam,
    getAllParams,
    setParam,
    setMultipleParams,
  };
};
