import placeholder from "~/images/placeholder.png";

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  mediaServerBaseURL: process.env.NEXT_PUBLIC_MEDIA_SERVER_BASE_URL,
  revalidationInterval: process.env.NEXT_PUBLIC_REVALIDATION_INTERVAL,
  validationPatterns: {
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
    url: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
  },
  images: {
    placeholder,
  },
};

export { config };
