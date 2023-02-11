import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import apiUrl from "../apiConfig";
import { addOption } from '../features/optionSlice'
import api from '../api/payee'
import { clearOption } from "../features/optionSlice";
import { falseOpen, trueOpen } from "../features/sideBarSlice";

const Home = (props:any) => {
  const dispatch = useDispatch()
  const result:any = useSelector((state) => state)
  const open = result?.sideBar.open
  console.log(open)
  // const user:any = result.user.value[0].user

const clearStore = () => {
  dispatch(clearOption())
  console.log(result)
}
const setOpenFalse = () => {
  dispatch(falseOpen())
  console.log(result)
}
const setOpenTrue = () => {
  dispatch(trueOpen())
  console.log(result)
}
console.log(result)

  return (
    <>
      <h2>Home Page</h2>
      <p>Hello </p>
      <button onClick={() => clearStore()}>Test redux</button>
      <button onClick={() => setOpenFalse()}>Test Open</button>
      <button onClick={() => setOpenTrue()}>Test Open True</button>
    </>
  );
};

export default Home;
