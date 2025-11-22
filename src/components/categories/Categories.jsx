import React, {  useContext,useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import {CategoriesContext} from '../../context/categoriesContext'
import { useQuery } from '@tanstack/react-query';

export default function Categories() {
  const[categories,setCategories]=useState([]);
  const { getAllCategory } = useContext(CategoriesContext);

 
  let{data}=useQuery(
    {
      queryKey:["categories"],
      queryFn:getAllCategory
    });
  
    useEffect(()=>{
      setCategories(data);
    },[data])
  return (
    <div>
        <div className='cards w-100 '>
          {categories?.data?.map((category)=>{
              return(
                <Link to={`/specificcategory/${category._id}`} key={category._id} className='text-decoration-none '>
                  <div className="card">
                    <img src={category.image} alt={category.name}  className='w-100'/>
                    <h3 className='text-success mt-3'>{category.name}</h3>
                  </div>
                </Link>
              )
          })}
        </div>
    </div>
  )

}