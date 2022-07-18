import React, { useEffect, useState } from 'react';
import { getProducts } from '../../API/products';
import Loading from '../../components/Loading';
import AdminProductCreateForm from '../../components/Product/AdminProductCreateForm';
import AdminProductEditForm from '../../components/Product/AdminProductEditForm';
import AdminProductTile from '../../components/Product/AdminProductTile';
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
      <h1>Products</h1>
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? 'Cancel' : 'Create Product'}
      </button>
      {loading ? (
        <Loading>Loading products</Loading>
      ) : (
        <div className="grid grid-cols-2 gap-5">{productList}</div>
      )}
    </div>
  );
}

export default AdminProducts;
