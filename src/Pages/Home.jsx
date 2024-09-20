import Crausel from '../Components/Crausel'
import ImageListing from '../Components/ImageListing'

import Products from './Products'

function Home() {
  return (
    <div >
      <Crausel/>
      <ImageListing/>
      <h1 className='text-center' style={{backgroundColor:'#1976d2',color:'white'}}>Products</h1>
      <Products/>
    </div>
  )
}

export default Home
