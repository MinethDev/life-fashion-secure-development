import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { backendUrl, currency } from '../App';
import SearchBar from '../components/SearchBar';
import { FaPencilAlt } from 'react-icons/fa';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Men',
    subcategory: 'Topwear',
    sizes: [],
  });

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateProduct = (product) => {
    setEditingProduct(product);
    setUpdatedData({ ...product, sizes: product.sizes || [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (size) => {
    setUpdatedData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const saveUpdatedProduct = async () => {
    try {
      const response = await axios.put(
        backendUrl + '/api/product/update',
        { ...updatedData, id: updatedData._id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Product updated successfully!');
        setEditingProduct(null);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <>
    <div className='mb-6'>
      <div className='flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-800'>
            All Products
          </h1>
          <p className='mt-1 text-sm text-gray-500'>
            Manage your store products
          </p>
        </div>

        <div className='text-sm text-gray-500'>
          {filteredList.length} product{filteredList.length !== 1 ? 's' : ''}
        </div>
      </div>

      <SearchBar onSearch={setSearch} />
    </div>

    <div className='overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl'>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[80px_3fr_1fr_1fr_1fr_100px] items-center gap-4 px-5 py-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wide'>
        <div>Image</div>
        <div>Product</div>
        <div>Category</div>
        <div>Subcategory</div>
        <div>Price</div>
        <div className='text-center'>Actions</div>
      </div>

      {/* Products */}
      <div className='divide-y divide-gray-100'>
        {filteredList.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-1 md:grid-cols-[80px_3fr_1fr_1fr_1fr_100px] items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors duration-150'
          >

            {/* Image */}
            <div className='flex items-center'>
              <div className='overflow-hidden bg-gray-100 border border-gray-200 rounded-lg w-14 h-14'>
                <img
                  className='object-cover w-full h-full'
                  src={item.image[0]}
                  alt={item.name}
                />
              </div>
            </div>

            {/* Product Name */}
            <div className='min-w-0'>
              <p className='font-medium text-gray-800 truncate'>
                {item.name}
              </p>
              <p className='mt-1 text-xs text-gray-400'>
                Product
              </p>
            </div>

            {/* Category */}
            <div>
              <span className='inline-flex px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600'>
                {item.category}
              </span>
            </div>

            {/* Subcategory */}
            <div className='text-sm text-gray-600'>
              {item.subCategory}
            </div>

            {/* Price */}
            <div className='font-semibold text-gray-800'>
              {currency}{item.price}
            </div>

            {/* Actions */}
            <div className='flex items-center justify-center gap-2'>

              <button
                type='button'
                title='Edit product'
                onClick={() => updateProduct(item)}
                className='flex items-center justify-center text-blue-500 transition border border-gray-200 rounded-lg w-9 h-9 hover:bg-blue-50 hover:border-blue-200'
              >
                <FaPencilAlt size={14} />
              </button>

              <button
                type='button'
                title='Delete product'
                onClick={() => removeProduct(item._id)}
                className='flex items-center justify-center text-red-500 transition border border-gray-200 rounded-lg w-9 h-9 hover:bg-red-50 hover:border-red-200'
              >
                ×
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredList.length === 0 && (
        <div className='py-12 text-center'>
          <p className='text-gray-500'>No products found.</p>
          {search && (
            <p className='mt-1 text-sm text-gray-400'>
              Try searching for a different product.
            </p>
          )}
        </div>
      )}

    </div>

    {/* Edit Product Modal */}
    {editingProduct && (
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50'>
        <div className='bg-white p-6 rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl'>

          <h2 className='mb-5 text-xl font-semibold'>
            Edit Product
          </h2>

          <label className='block mb-2 text-sm font-medium'>Name:</label>
          <input
            type='text'
            name='name'
            value={updatedData.name || ''}
            onChange={handleInputChange}
            className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'
          />

          <label className='block mt-4 mb-2 text-sm font-medium'>
            Description:
          </label>
          <textarea
            name='description'
            value={updatedData.description || ''}
            onChange={handleInputChange}
            className='w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100'
            rows='4'
          />

          <label className='block mt-4 mb-2 text-sm font-medium'>
            Category:
          </label>
          <select
            name='category'
            value={updatedData.category || ''}
            onChange={handleInputChange}
            className='w-full p-2.5 border border-gray-300 rounded-lg'
          >
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>

          <label className='block mt-4 mb-2 text-sm font-medium'>
            Subcategory:
          </label>
          <select
            name='subCategory'
            value={updatedData.subCategory || ''}
            onChange={handleInputChange}
            className='w-full p-2.5 border border-gray-300 rounded-lg'
          >
            <option value='Topwear'>Topwear</option>
            <option value='Bottomwear'>Bottomwear</option>
            <option value='Winterwear'>Winterwear</option>
          </select>

          <label className='block mt-4 mb-2 text-sm font-medium'>
            Price:
          </label>
          <input
            type='number'
            name='price'
            value={updatedData.price || ''}
            onChange={handleInputChange}
            className='w-full p-2.5 border border-gray-300 rounded-lg'
          />

          <label className='block mt-4 mb-2 text-sm font-medium'>
            Sizes:
          </label>

          <div className='flex flex-wrap gap-2'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                type='button'
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-3 py-1.5 rounded-md border text-sm transition ${
                  updatedData.sizes.includes(size)
                    ? 'bg-pink-100 border-pink-300 text-pink-700'
                    : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className='flex justify-end gap-2 mt-6'>
            <button
              type='button'
              className='px-4 py-2 transition bg-gray-100 rounded-lg hover:bg-gray-200'
              onClick={() => setEditingProduct(null)}
            >
              Cancel
            </button>

            <button
              type='button'
              className='px-4 py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600'
              onClick={saveUpdatedProduct}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    )}
  </>
);;
};

export default List;
