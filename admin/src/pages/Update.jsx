import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Import the ShopContext
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to get the productId from the URL
import { toast } from 'react-toastify';
import { backendUrl } from '../App'; // Make sure the backend URL is correct

const Update = () => {
  const { products, getProductsData, backendUrl } = useContext(ShopContext); // Access products and getProductsData from ShopContext
  const [productToEdit, setProductToEdit] = useState(null); // State to hold the product being edited
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const { productId } = useParams(); // Get productId from the URL
  const navigate = useNavigate(); // For navigation after update

  // Fetch the product details when the component is mounted or productId changes
  useEffect(() => {
    if (productId) {
      // Fetch the products first
      getProductsData();
    }
  }, [productId, getProductsData]);

  // Find the product to be edited
  useEffect(() => {
    if (products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductToEdit(product);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setBestseller(product.bestseller);
        setSizes(product.sizes);
        // If your images are URLs, update them here as well
        setImage1(product.image1);
        setImage2(product.image2);
        setImage3(product.image3);
        setImage4(product.image4);
      }
    }
  }, [products, productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.put(`${backendUrl}/api/product/update/${productId}`, formData, {
        headers: { token: localStorage.getItem('token') }, // Assuming token is saved in localStorage
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin'); // Navigate to the admin panel after updating
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.message);
    }
  };

  if (!productToEdit) {
    return <div>Loading...</div>; // Show a loading state while fetching the product data
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={image1 ? URL.createObjectURL(image1) : productToEdit.image1} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20" src={image2 ? URL.createObjectURL(image2) : productToEdit.image2} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20" src={image3 ? URL.createObjectURL(image3) : productToEdit.image3} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20" src={image4 ? URL.createObjectURL(image4) : productToEdit.image4} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded-md outline-none"
            type="number"
            placeholder="1500"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {/* Repeat for S, M, L, XL, XXL sizes */}
          <div onClick={() => setSizes((prev) => prev.includes('S') ? prev.filter((item) => item !== 'S') : [...prev, 'S'])}>
            <p className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('M') ? prev.filter((item) => item !== 'M') : [...prev, 'M'])}>
            <p className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('L') ? prev.filter((item) => item !== 'L') : [...prev, 'L'])}>
            <p className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('XL') ? prev.filter((item) => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('XXL') ? prev.filter((item) => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        UPDATE
      </button>
    </form>
  );
};

export default Update;
