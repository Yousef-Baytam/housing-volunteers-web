import clsx, { ClassValue } from "clsx";
import qs from "qs";
import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import { ImageType } from "@/types/data.types";
import { CustomFetchConfig } from "@/types/misc.types";
import { config } from "./config";

const {
  baseURL,
  mediaServerBaseURL,
  revalidationInterval,
  images: { placeholder },
} = config;

/** Merge classes with tailwind-merge with clsx full feature */
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const handleFetch = async ({
  url,
  method,
  headers,
  data,
  params = {},
  cache = undefined,
  next = {
    revalidate: revalidationInterval
      ? parseInt(revalidationInterval, 10)
      : 86400,
  },
}: CustomFetchConfig) => {
  try {
    const fullUrl = `${baseURL}${url}?${qs.stringify({ populate: "*", ...params }, { arrayFormat: "repeat" })}`;
    const res = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: data,
      cache,
      next,
    });
    return await res.json();
  } catch (err) {
    return err;
  }
};

const getImage = ({
  image,
  size,
}: {
  image?: ImageType;
  size: "thumbnail" | "small" | "medium" | "large" | "xLarge" | "url";
}): string | StaticImageData => {
  if (!image) return placeholder;
  const { attributes } = image ?? {};
  const { formats, url } = attributes ?? {};
  const { thumbnail, small, medium, large } = formats ?? {};
  switch (size) {
    case "large":
      if (large?.url?.length) return `${mediaServerBaseURL ?? ""}${large?.url}`;
      return getImage({ image, size: "medium" });
    case "medium":
      if (medium?.url?.length)
        return `${mediaServerBaseURL ?? ""}${medium?.url}`;
      return getImage({ image, size: "small" });
    case "small":
      if (small?.url?.length) return `${mediaServerBaseURL ?? ""}${small?.url}`;
      return getImage({ image, size: "thumbnail" });
    case "thumbnail":
      if (thumbnail?.url?.length)
        return `${mediaServerBaseURL ?? ""}${thumbnail?.url}`;
      return getImage({ image, size: "url" });
    case "url":
      if (url?.length) return `${mediaServerBaseURL ?? ""}${url}`;
      return placeholder;
    default:
      return placeholder;
  }
};

const scrollToId = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export { cn, handleFetch, getImage, scrollToId };
