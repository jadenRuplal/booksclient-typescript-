import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

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
