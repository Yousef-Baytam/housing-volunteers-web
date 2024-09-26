import TextBlock from "@/components/core/TextBlock";
import { Pagination } from "@/components/screenElements/Pagination";
import listingsAPIs from "@/services/apis/listings";
import { ApartmentListing, Meta } from "@/types/data.types";
import { cn, getImage, handleFetch } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { LuBuilding, LuMapPin, LuUsers } from "react-icons/lu";

const getListings = async (page: string) => {
  try {
    const res =
      (await handleFetch({
        method: "GET",
        url: listingsAPIs.getAll,
        params: {
          filters: { isAvailable: { $eq: "true" } },
          sort: { createdAt: "asc" },
          populate: "*",
          pagination: { page, pageSize: "15" },
        },
        next: undefined,
      })) ?? {};
    return res as { data: ApartmentListing[]; meta: Meta };
  } catch (err) {
    return undefined;
  }
};

const Home = async ({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) => {
  const { data, meta } = (await getListings(page)) ?? {};

  const { pagination } = meta ?? {};
  const { pageCount } = pagination ?? {};

  return (
    <div className="flex flex-col items-center gap-5 px-4 md:items-end md:px-16">
      <ul className="flex flex-wrap items-center gap-4 md:gap-16">
        {data?.map((listing) => {
          const {
            id,
            title,
            capacity,
            region,
            address,
            rent,
            currency,
            images,
            listing_type: listingType,
            phone,
          } = listing ?? {};
          const { title: listingTypeTitle } = listingType ?? {};

          const addressLine = [address, region?.name]
            .filter(Boolean)
            .join(", ");

          const isRentNA = rent < 0;
          const isFree = rent === 0;

          const getRentPrice = () => {
            if (isRentNA) return "N/A";
            if (isFree) return "Free";
            return `${rent.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${currency}`;
          };

          return (
            <li
              key={id}
              className="w-1/4 min-w-full max-w-full grow md:min-w-[440px] lg:max-w-[calc(100%/2-64px*1/2)] xl:max-w-[calc(100%/3-64px*2/3)]"
            >
              <button
                className="flex w-full flex-col justify-center gap-4 rounded-xl bg-secondary p-4 transition-all duration-75 ease-linear hover:shadow-lg active:shadow-none has-[:hover]:shadow-none md:flex-row"
                type="button"
              >
                <Image
                  src={getImage({ image: images?.[0].data, size: "large" })}
                  alt="listing"
                  className="pointer-events-none size-full h-52 select-none rounded-lg object-cover md:size-52"
                />
                <div className="pointer-events-none flex h-52 w-full grow select-none flex-col items-start justify-between">
                  <TextBlock
                    text={title}
                    className="text-start text-lg font-bold md:text-xl"
                  />
                  <div className="flex items-center justify-center gap-2">
                    <LuMapPin className="size-5 text-muted-foreground" />
                    <TextBlock text={addressLine} className="text-start" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <LuBuilding className="size-5 text-muted-foreground" />
                    <TextBlock
                      text={listingTypeTitle}
                      className="text-start font-medium"
                    />
                  </div>
                  <div
                    className={cn(
                      "rounded bg-yellow-300 p-1 px-4 text-yellow-800",
                      {
                        "bg-green-300 text-green-800": isFree,
                        "bg-black/80 text-white": isRentNA,
                      },
                    )}
                  >
                    <TextBlock text={getRentPrice()} className="text-start" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <LuUsers className="size-5 text-muted-foreground" />
                    <TextBlock
                      text={capacity > 0 ? capacity : "N/A"}
                      className="text-start"
                    />
                  </div>
                </div>
                <Link
                  href={`https://wa.me/${phone.startsWith("+961") ? phone : `+961${phone}`}`}
                  className="self-end rounded-full bg-green-400 p-2 transition-all duration-75 ease-linear hover:shadow-lg active:shadow-none"
                >
                  <FaWhatsapp className="size-10 text-white" />
                </Link>
              </button>
            </li>
          );
        })}
      </ul>
      <Pagination
        page={parseInt(page, 10)}
        maxPages={parseInt(`${pageCount}`, 10)}
        containerClassName="pt-10"
      />
    </div>
  );
};

export default Home;
