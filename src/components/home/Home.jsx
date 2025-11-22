import React from 'react'
import Recentproducts from '../recentproducts/Recentproducts'
import Categoryslider from './categoryslider'
import Mainslider from './mainslider'

export default function Home() {
  return (
    <div> 
    <Mainslider/>
  <Categoryslider/>
      <Recentproducts/>
    </div>
  )
}
