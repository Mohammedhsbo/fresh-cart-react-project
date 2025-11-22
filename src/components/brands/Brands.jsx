import React, { useContext, useEffect, useState } from 'react';
import { BrandContext } from '../../context/Brandcontext';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';


export default function Brands() {
  let navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const { brandsget } = useContext(BrandContext);

  // ✅ تصحيح اسم المفتاح في queryKey + تفعيل الجلب التلقائي
  const { data, isLoading, isError } = useQuery({
    queryKey: ['brand-items'],
    queryFn: brandsget,
  });

  useEffect(() => {
    if (data?.data?.data) {
      // ✅ بعض الـ APIs بترجع البيانات في شكل data.data.data
      setBrands(data.data.data);
    } else if (data) {
      setBrands(data);
    }
  }, [data]);

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 mt-5">Error loading brands</div>;

  return (
    <div>
        {isLoading && <h1>Loading...</h1>}
        {isError && <h2>Error loading brands</h2>}
        {
         <div className="cards">
  {brands?.data?.map((brand) => (
    <div key={brand._id} className="card">
      <img src={brand.image} alt={brand.name} className="border-5" />
      <h2 className="text-start text-success fw-bold">
        <span className="text-black">Brand:</span> {brand.name}
      </h2>
      <hr />
       <button onClick={() => navigate(`/specificbrand/${brand._id}`)} className="btn btn-success mt-3 w-100">Read More</button>
    </div>
  ))}
</div>

        }

    </div>
  );
}
