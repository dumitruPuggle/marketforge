import NavBar from "../../components/NavBar/NavBar";
import BuildingImage from '../../assets/homepage/under_construction.jpeg';

function Home(){
    return(
        <div>
            <NavBar />
            <img style={{borderRadius: "20px"}} className="w-50 mb-3" alt="" src={BuildingImage} />
            <h6>Under Construction</h6>
        </div>
    )
}

export default Home;