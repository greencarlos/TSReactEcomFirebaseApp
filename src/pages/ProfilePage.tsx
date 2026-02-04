import {useState} from 'react'
import NavBar from "../navigation/navbar";
import GetUserComp from '../comps/GetUserComp'
import DeleteUserComp from '../comps/DeleteUserComp'
import OrderHistoryComp from '../comps/OrderHistoryComp'

const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <h2 className="center">Profile Page</h2>
      <DeleteUserComp />
      <GetUserComp />
      <OrderHistoryComp />
    </>
  )
}

export default ProfilePage
