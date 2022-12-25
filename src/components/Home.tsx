import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = (props:any) => {
  // const { msgAlert, user } = props
  console.log("props in home", props);
  const result:any = useSelector((state) => state);
  const user:any = result.user.value[0].user;
  console.log("this is redux state", user);
  
  return (
    <>
      <h2>Home Page</h2>
      <p>Hello {user?.first_name}</p>
    </>
  );
};

export default Home;
