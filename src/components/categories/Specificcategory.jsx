import React, { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../context/categoriesContext';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function Specificcategory() {
  const { id } = useParams();
  const { getSpecificCategory } = useContext(CategoriesContext); // ✅ تأكد من الاسم
  const [category, setCategory] = useState(null);

  // ✅ خلي الدالة ترجع الـ promise
  const { data, isLoading, isError } = useQuery({
    queryKey: ['specificcategory', id],
    queryFn: () => getSpecificCategory(id),
  });

  useEffect(() => {
    if (data) setCategory(data);
  }, [data]);

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (isError) return <h2 className="text-center text-danger mt-5">Error loading category</h2>;

  // ✅ تأمين الوصول للداتا
  if (!category) return null;

  return (
    <div className="container mt-5 text-center">
      <img
        src={category.image}
        alt={category.name}
        style={{ width: '250px', borderRadius: '15px', marginBottom: '20px' }}
      />
      <h2 className="text-success fw-bold">{category.name}</h2>
      <p className="text-muted">Slug: {category.slug}</p>
      <hr />
      <p><b>Category ID:</b> {category._id}</p>
      <p><b>Created At:</b> {new Date(category.createdAt).toLocaleString()}</p>
    </div>
  );
}

