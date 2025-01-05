import { ProductList } from '../components/products/ProductList';

export function ShopPage() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-gray-100 text-center mb-4">
        Shop Products
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
        Browse our collection of premium coaching resources and materials
      </p>
      <ProductList />
    </div>
  );
}