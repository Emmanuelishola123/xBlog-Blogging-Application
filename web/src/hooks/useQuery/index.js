import { useSearchParams } from "react-router-dom";

export const UseQuery = (queryKey = "redirect") => {
  const [searchParams] = useSearchParams();

  return searchParams.get(queryKey);
};

export const SetQuery = (value, key = 'c') => {
  const [setSearchParams] = useSearchParams();
 return setSearchParams({ key, value });
};

