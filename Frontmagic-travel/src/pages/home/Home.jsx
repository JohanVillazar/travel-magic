


import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";


const Home = () => {
  return (
    <div>

      <Header/>
      <div className="homeContainer">
        <Featured/>
        
        <PropertyList/>
        <FeaturedProperties/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
