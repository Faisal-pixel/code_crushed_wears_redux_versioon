import { Outlet } from "react-router-dom";
import CategoriesContainier from "../../components/categories/categories.components";

const Home = () => {

  return (
    <>
     <CategoriesContainier/> 
     <Outlet />
    </>
  );
}

export default Home;
