import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts } from "@/lib/actions/product.actions";
import { BaseFilterParams, getFilterUrl } from "@/lib/getFilterUrl";

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

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="filter-links">
        {/* FILTERS */}
        URL: {getFilterUrl({ c: "Mens Sweat Shirts", baseParams })}
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
