"use client";

import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { cn } from "@/utils/helpers";
import { useQueryState } from "@/utils/hooks/useQueryState";

interface IPaginationProps {
  page: number;
  maxPages: number;
  containerClassName?: string;
}

const Pagination = ({
  page = 1,
  maxPages = 1,
  containerClassName = "",
}: IPaginationProps) => {
  const isFirstPage = page === 1;
  const isLastPage = page === maxPages;

  const [, setPage] = useQueryState("page");

  const pages = new Array(maxPages).fill(1).map((_, index) => index + 1);

  const isPageButtonVisible = (localPage: number) =>
    localPage === 1 || localPage === maxPages || Math.abs(localPage - page) < 2;

  return (
    <div className={cn("flex select-none gap-4", containerClassName)}>
      <button
        className={cn(
          "flex cursor-pointer items-center gap-2 text-white transition-all duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-70",
          { "hover:scale-105": !isFirstPage },
        )}
        disabled={isFirstPage}
        type="button"
        onClick={() => {
          setPage({ value: page - 1 });
        }}
      >
        <MdArrowLeft className="size-6 text-primary rtl:rotate-180" />
      </button>
      <div className="flex items-center justify-center">
        {pages?.map((localPage, index) => {
          const isPageVisible = isPageButtonVisible(localPage);
          const isPrevPageVisible = isPageButtonVisible(
            localPage - 1 > 1 ? localPage - 1 : 1,
          );
          return (
            <div
              key={index}
              className={cn("px-3", {
                hidden: !isPrevPageVisible && !isPageVisible,
              })}
            >
              <div
                className={cn(
                  "text-semibold flex size-10 items-center justify-center text-primary",
                  {
                    hidden: isPageVisible,
                  },
                )}
              >
                ...
              </div>
              <button
                className={cn(
                  "text-semibold flex size-10 items-center justify-center rounded-lg text-sm font-medium text-primary",
                  {
                    "bg-primary text-secondary": localPage === page,
                    hidden: !isPageVisible,
                  },
                )}
                type="button"
                onClick={() => {
                  setPage({ value: localPage });
                }}
              >
                {localPage}
              </button>
            </div>
          );
        })}
      </div>
      <button
        className={cn(
          "flex cursor-pointer items-center gap-2 text-white transition-all duration-75 ease-linear disabled:cursor-not-allowed disabled:opacity-70",
          { "hover:scale-105": !isFirstPage },
        )}
        disabled={isLastPage}
        type="button"
        onClick={() => {
          setPage({ value: page + 1 });
        }}
      >
        <MdArrowRight className="size-6 text-primary rtl:rotate-180" />
      </button>
    </div>
  );
};

export { Pagination };
