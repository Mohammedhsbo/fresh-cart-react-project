import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BrandContext } from '../../context/Brandcontext';
import { useContext } from 'react';

export default function Specificbrand() {
  const { id } = useParams();
  const { getspecificbrand } = useContext(BrandContext);

  const { data: brand, isLoading, isError } = useQuery({
    queryKey: ['specific-brand', id],
    queryFn: () => getspecificbrand(id),
  });

  if (isLoading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (isError) return <h2 className="text-center text-danger mt-5">Error loading brand</h2>;

  return (
    <div className="container mt-5 text-center">
      <img
        src={brand.image}
        alt={brand.name}
        style={{ width: '250px', borderRadius: '15px', marginBottom: '20px' }}
      />
      <h2 className="text-success fw-bold">{brand.name}</h2>
      <p className="text-muted">Slug: {brand.slug}</p>
      <hr />
      <p><b>Brand ID:</b> {brand._id}</p>
      <p><b>Created At:</b> {new Date(brand.createdAt).toLocaleString()}</p>
    </div>
  );
}
