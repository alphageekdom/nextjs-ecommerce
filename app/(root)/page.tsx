// const delay = (ms: number | undefined) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import ViewAllProductsButton from "@/components/view-all-products-button";
// import sampleData from "@/db/sample-data";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

const Homepage = async () => {
  // await delay(2000);
  // console.log(sampleData);

  const latestProducts = await getLatestProducts();

  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {/* <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      /> */}
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
      <ViewAllProductsButton />
    </>
  );
};

export default Homepage;
