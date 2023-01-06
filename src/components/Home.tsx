import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import apiUrl from "../apiConfig";
import { addOption } from '../features/optionSlice'
import api from '../api/payee'

const Home = (props:any) => {
  const result:any = useSelector((state) => state)
  const user:any = result.user.value[0].user


  
  return (
    <>
      <h2>Home Page</h2>
      <p>Hello {user?.first_name}</p>
    </>
  );
};

export default Home;
