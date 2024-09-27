"use client";

import React from "react";
import TextBlock from "@/components/core/TextBlock";
import { LuX, LuFilter, LuArrowDown } from "react-icons/lu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/core/Sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/core/Accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/core/Popover";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/utils/helpers";
import { PopoverClose } from "@radix-ui/react-popover";
import { Close } from "@radix-ui/react-dialog";
import { useQueryState } from "@/utils/hooks/useQueryState";
import { useEffectOnce } from "react-use";

const sortingOptions = [
  { label: "Date", code: "createdAt" },
  { label: "Price", code: "rent" },
  { label: "Capacity", code: "capacity" },
];

export type SortByOptions = "createdAt" | "rent" | "capacity" | "";
export type SortModeOptions = "asc" | "desc";

export type FormValuesType = {
  sortBy: SortByOptions;
  sortMode: SortModeOptions;
};

const defaultValues = {
  sortBy: "",
  sortMode: "desc",
} as FormValuesType;

const Toolbar = () => {
  /**
   * Do not use 'handleSubmit' cuz it stops the click propagation and prevents closing the sheet
   */
  const { control, watch, setValue, getValues } = useForm<FormValuesType>({
    defaultValues,
  });

  const wSortBy = watch("sortBy");
  const wSortMode = watch("sortMode");

  const [sort, setSort] = useQueryState<{
    sortBy: SortByOptions;
    sortMode: SortModeOptions;
  }>("sort");
  //   const [filter] = useQueryState("filter");

  useEffectOnce(() => {
    const { sortBy, sortMode } = sort ?? {};
    if (wSortBy !== sortBy && !!sortBy) setValue("sortBy", sortBy);
    if (wSortMode !== sortMode && !!sortMode) setValue("sortMode", sortMode);
  });

  const onSubmit = () => {
    const { sortBy, sortMode } = getValues() ?? {};
    if (!sortBy) {
      setSort({ value: undefined });
    } else {
      setSort({ multiple: { sort: { sortBy, sortMode }, page: 1 } });
    }
  };

  const handleClearFilters = () => {
    setSort({ multiple: { sort: undefined, filter: undefined } });
  };

  return (
    <div className="flex w-full justify-end gap-4">
      {sort ? (
        <button
          type="button"
          onClick={handleClearFilters}
          className="group flex items-center justify-center gap-2"
        >
          <LuX className="size-6 text-gray-600" />
          <TextBlock text="Clear filters" className="group-hover:underline" />
        </button>
      ) : null}

      <Sheet>
        <SheetTrigger>
          <div className="rounded-lg border-2 border-gray-400 p-2 ring-primary transition-all duration-100 ease-linear hover:shadow-lg active:shadow-none active:ring-2">
            <LuFilter
              className={cn("size-6 text-gray-600", { "fill-primary": !!sort })}
            />
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <TextBlock
                text="Sort & Filters"
                className="select-none text-xl md:text-2xl"
              />
            </SheetTitle>
            <SheetDescription>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="sort">
                  <AccordionTrigger>
                    <TextBlock text="Sort" className="text-muted-foreground" />
                  </AccordionTrigger>
                  <AccordionContent className="flex items-center gap-4">
                    <Controller
                      name="sortBy"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const selectedOption = sortingOptions.find(
                          (option) => option.code === value,
                        )?.label;
                        return (
                          <Popover>
                            <PopoverTrigger className="flex items-center gap-3 py-4">
                              <TextBlock text="Sort By:" />
                              <div className="min-w-36 rounded-lg border border-gray-300 px-2 py-1">
                                <TextBlock
                                  text={
                                    selectedOption?.length
                                      ? selectedOption
                                      : "Select an Option"
                                  }
                                  className={cn("text-gray-500", {
                                    "text-primary": !!value,
                                  })}
                                />
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="flex max-w-56 flex-col divide-y divide-gray-300 p-0">
                              {sortingOptions.map((option) => {
                                const { label, code } = option;

                                const handleSelectOption = () => {
                                  onChange(code);
                                };

                                return (
                                  <PopoverClose
                                    key={code}
                                    onClick={handleSelectOption}
                                  >
                                    <div className="py-3">
                                      <TextBlock text={label} />
                                    </div>
                                  </PopoverClose>
                                );
                              })}
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    />
                    <Controller
                      name="sortMode"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <button
                          className="h-fit w-fit rounded-lg border border-gray-300 p-1"
                          type="button"
                          onClick={() =>
                            onChange(value === "asc" ? "desc" : "asc")
                          }
                        >
                          <LuArrowDown
                            className={cn(
                              "size-6 transition-all duration-100 ease-linear",
                              {
                                "rotate-180": value === "asc",
                              },
                            )}
                          />
                        </button>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
                {/* <AccordionItem value="filters">
                  <AccordionTrigger>
                    <TextBlock
                      text="Filters"
                      className="text-muted-foreground"
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem> */}
              </Accordion>
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  className="w-full rounded-lg border-2 bg-primary-foreground py-3 transition-all duration-100 ease-linear hover:shadow-lg active:shadow-none"
                  type="button"
                  onClick={handleClearFilters}
                >
                  <TextBlock text="Clear Filters" />
                </button>
                <Close className="w-full" onClick={onSubmit}>
                  <div className="w-full rounded-lg border-2 bg-primary py-3 transition-all duration-100 ease-linear hover:shadow-lg active:shadow-none">
                    <TextBlock text="Apply Filters" className="text-white" />
                  </div>
                </Close>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Toolbar;
