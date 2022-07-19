import React, { useEffect, useState } from 'react';
import { getProducts } from '../../API/products';
import Loading from '../../components/Loading';
import AdminProductCreateForm from '../../components/Product/AdminProductCreateForm';
import AdminProductEditForm from '../../components/Product/AdminProductEditForm';
import AdminProductTile from '../../components/Product/AdminProductTile';
import PageHead from '../../components/UI/PageHead';
import { IProductDocument } from '../../interfaces/product';

function AdminProducts() {
  const [products, setProducts] = useState<IProductDocument[]>([]);
  const [loading, setLoading] = useState(false);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [updatingProduct, setUpdatingProduct] =
    useState<IProductDocument | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const data: { count: number; products: IProductDocument[] } =
      await getProducts();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productList = products.map((product) => {
    return (
      <AdminProductTile
        product={product}
        setUpdatingProduct={setUpdatingProduct}
        key={product._id}
      />
    );
  });

  return (
    <div>
      {showCreateForm && (
        <AdminProductCreateForm
          afterSubmit={() => {
            fetchProducts();
            setShowCreateForm(false);
          }}
        />
      )}
      {updatingProduct && (
        <AdminProductEditForm
          initialProduct={updatingProduct}
          setUpdatingProduct={setUpdatingProduct}
          afterSubmit={() => {
            setUpdatingProduct(null);
            fetchProducts();
          }}
        />
      )}
      <PageHead title="All Products">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="uppercase bg-red-700 text-white py-1 px-3 rounded-full hover:bg-red-600"
        >
          {showCreateForm ? 'Cancel' : 'Create Product'}
        </button>
      </PageHead>

      {loading ? (
        <Loading>Loading products</Loading>
      ) : (
        <div className="grid grid-cols-2 gap-5">{productList}</div>
      )}
    </div>
  );
}

export default AdminProducts;
