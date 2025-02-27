export interface BaseFilterParams {
  q: string;
  category: string;
  price: string;
  rating: string;
  sort: string;
  page: string;
}

export interface GetFilterUrlArg {
  // Optional override values
  c?: string;
  p?: string;
  r?: string;
  s?: string;
  pg?: string;

  // Base parameters used to construct the URL
  baseParams: BaseFilterParams;
}

// Construct filter URL
export function getFilterUrl({
  c,
  p,
  r,
  s,
  pg,
  baseParams,
}: GetFilterUrlArg): string {
  const params = { ...baseParams };

  if (c) params.category = c;
  if (p) params.price = p;
  if (r) params.rating = r;
  if (s) params.sort = s;
  if (pg) params.page = pg;

  return `/search?${new URLSearchParams(params).toString()}`;
}
