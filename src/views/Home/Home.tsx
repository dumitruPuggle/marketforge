// import NavBar from "../../components/NavBar/NavBar";
import BuildingImage from '../../assets/homepage/under_construction.jpeg';
import './Home.css';

function Home(){
    return(
        <div className="flex-column flex-align-center">
            {/* <NavBar /> */}
            <img style={{borderRadius: "20px"}} className="w-50 mb-3 mt-5" alt="" src={BuildingImage} />
            <small>This product is under construction</small>
            <small className='text-medium'>Want to join our dev team? Contacts: t.me/Andriannicolaev</small>
            <img draggable={false} style={{width: 20}} className="mt-3" src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Cc.logo.circle.svg" />
        </div>
    )
}

export default Home;