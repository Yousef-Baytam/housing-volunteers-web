/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

type QueryStateOptions = {
  value?: string | number | boolean | undefined | any;
  multiple?: Record<string, string | number | boolean | undefined | any>;
};

type SetQuery = (options: QueryStateOptions) => void;

export const useQueryState = <T extends string | number | boolean | any>(
  query: string,
  addToHistory = true,
): [T | undefined, SetQuery] => {
  const pathname = usePathname();
  const searchParams = useSearchParams().toString();
  const { push, replace } = useRouter();

  const existingQueries = useMemo(() => qs.parse(searchParams), [searchParams]);

  const setQuery: SetQuery = useCallback(
    ({ value, multiple }) => {
      let queryString: string;

      if (multiple) {
        queryString = qs.stringify({ ...existingQueries, ...multiple });
      } else {
        queryString = qs.stringify({
          ...existingQueries,
          [query]: value,
        });
        console.log({
          value,
          existingQueries,
          queryString,
          query,
          [query]: value,
        });
      }

      const handler = addToHistory ? push : replace;

      handler(`${pathname}?${queryString}`);
    },
    [addToHistory, existingQueries, pathname, push, query, replace],
  );

  const value = useMemo(
    () => existingQueries?.[query] as T,
    [existingQueries, query],
  );

  return [value, setQuery];
};
