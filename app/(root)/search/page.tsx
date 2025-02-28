import ProductCard from "@/components/shared/product/product-card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import { BaseFilterParams, getFilterUrl } from "@/lib/getFilterUrl";
import Link from "next/link";

interface SearchParams {
  q?: string;
  category?: string;
  price?: string;
  rating?: string;
  sort?: string;
  page?: string;
}

interface SearchPageProps {
  searchParams: Promise<SearchParams>;
}

const prices = [
  { name: "$1 to $50", value: "1-50" },
  { name: "$51 to $100", value: "51-100" },
  { name: "$101 to $200", value: "101-200" },
  { name: "$201 to $500", value: "201-220" },
  { name: "$501 to $1000", value: "501-1000" },
];

const SearchPage = async (props: SearchPageProps) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  //   console.log(q, category, price, rating, sort, page);

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  // Construct filter URL
  const baseParams: BaseFilterParams = {
    q,
    category,
    price,
    rating,
    sort,
    page,
  };

  const categories = await getAllCategories();

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* Category Links */}

        <div className="mb-2 mt-3 text-xl">Department</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${(category === "all" || category === "") && "font-bold"}`}
                href={getFilterUrl({ c: "all", baseParams })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && "font-bold"}`}
                  href={getFilterUrl({ c: x.category, baseParams })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Price Links */}

        <div className="mb-2 mt-8 text-xl">Price</div>
        <div>
          <ul className="space-y-1">
            <li>
              <Link
                className={`${category === "all" && "font-bold"}`}
                href={getFilterUrl({ p: "all", baseParams })}
              >
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  className={`${price === p.value && "font-bold"}`}
                  href={getFilterUrl({ p: p.value, baseParams })}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-4 md:col-span-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && (
            <div className="h2-bold w-full md:w-[500px]">
              No products found...
            </div>
          )}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
