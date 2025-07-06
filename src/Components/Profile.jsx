import React from 'react'
import EditProfile from './editProfile'
import { useSelector } from 'react-redux'

const profile = () => {
  const user = useSelector((store)=>store.user)
  return ( user&&(
    <div><EditProfile user={user}/></div>
  )
)
}

export default profile

