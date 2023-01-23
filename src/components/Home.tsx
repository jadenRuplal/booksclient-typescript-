import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import apiUrl from "../apiConfig";
import { addOption } from '../features/optionSlice'
import api from '../api/payee'
import { clearOption } from "../features/optionSlice";

const Home = (props:any) => {
  const dispatch = useDispatch()
  const result:any = useSelector((state) => state)
  // const user:any = result.user.value[0].user

const clearStore = () => {
  dispatch(clearOption())
  console.log(result)
}
console.log(result)

  return (
    <>
      <h2>Home Page</h2>
      <p>Hello </p>
      <button onClick={() => clearStore()}></button>
    </>
  );
};

export default Home;
