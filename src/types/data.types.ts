interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ImageType {
  id: number;
  attributes: ImageAttributes;
}

interface Image {
  data: ImageType;
}

interface Region {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface ListingType {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface ApartmentListing {
  id: number;
  documentId: string;
  title: string;
  phone: string;
  images: Image[] | null;
  gmapsEmbedUrl: string | null;
  address: string | null;
  isAvailable: boolean;
  lastUpdated: string | null;
  rent: number;
  currency: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  region: Region;
  listing_type: ListingType;
  localizations: any[];
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

export type { Image, ImageType, ApartmentListing, Meta };
