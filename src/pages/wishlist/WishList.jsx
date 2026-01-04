import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function WishList() {
  const user = useSelector(state=> state.userDetails.user)

  useEffect(()=>{
    console.log(user);
  }, [user])
  return (
    <div>{user && user?.data?.wishlist?.map(product=> <div>{product.productId}</div>)}</div>
  )
}

export default WishList