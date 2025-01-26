// const delay = (ms: number | undefined) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

import ProductList from "@/components/shared/products/product-list";
// import sampleData from "@/db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";

const Homepage = async () => {
  // await delay(2000);
  // console.log(sampleData);

  const latestProducts = await getLatestProducts();
  return (
    <>
      {/* <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      /> */}
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
