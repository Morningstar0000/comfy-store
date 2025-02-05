import React from 'react'
import { FeaturedProducts, Hero } from '../component'
import { customFetch } from '../utilis/index'


const url = "/products?featured=true";

const FeaturedProductsQuery = {
  queryKey:['featuredProducts'],
  queryFn: () => customFetch(url)
}

export const loader =(queryClient)=> async () => {
  const response = await queryClient.ensureQueryData(FeaturedProductsQuery);
  const products = response.data.data
  console.log(response)
  return {products};

  
}

function Landing() {
  return (
    <>
      <Hero/>
      <FeaturedProducts/>
    </>
  )
}

export default Landing
