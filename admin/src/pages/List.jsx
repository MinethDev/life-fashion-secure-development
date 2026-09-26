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
      <SearchBar onSearch={setSearch} />
      <p className='mb-2'>All Products List</p>

      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Subcategory</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {filteredList.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.Image[0]} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.subcategory}</p>
            <p>{currency}{item.price}</p>
            <div className='flex gap-2'>
              <FaPencilAlt className='cursor-pointer text-blue-500' onClick={() => updateProduct(item)} />
              <p onClick={() => removeProduct(item._id)} className='cursor-pointer text-lg text-red-500'>X</p>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg w-96'>
            <h2 className='text-xl font-semibold mb-4'>Edit Product</h2>
            <label className='block mb-2'>Name:</label>
            <input type='text' name='name' value={updatedData.name || ''} onChange={handleInputChange} className='w-full p-2 border rounded' />

            <label className='block mt-2 mb-2'>Description:</label>
            <textarea name='description' value={updatedData.description || ''} onChange={handleInputChange} className='w-full p-2 border rounded'></textarea>

            <label className='block mt-2 mb-2'>Category:</label>
            <select name='category' value={updatedData.category || ''} onChange={handleInputChange} className='w-full p-2 border rounded'>
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>

            <label className='block mt-2 mb-2'>Subcategory:</label>
            <select name='subcategory' value={updatedData.subcategory || ''} onChange={handleInputChange} className='w-full p-2 border rounded'>
              <option value='Topwear'>Topwear</option>
              <option value='Bottomwear'>Bottomwear</option>
              <option value='Winterwear'>Winterwear</option>
            </select>

            <label className='block mt-2 mb-2'>Price:</label>
            <input type='number' name='price' value={updatedData.price || ''} onChange={handleInputChange} className='w-full p-2 border rounded' />

            <label className='block mt-2 mb-2'>Sizes:</label>
            <div className='flex gap-3'>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div key={size} onClick={() => handleSizeChange(size)}>
                  <p className={updatedData.sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer>
                    {size}
                  </p>
                </div>
              ))}
            </div>

            <div className='flex justify-end mt-4'>
              <button className='bg-gray-400 px-4 py-2 rounded mr-2' onClick={() => setEditingProduct(null)}>Cancel</button>
              <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={saveUpdatedProduct}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default List;
