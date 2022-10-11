// import NavBar from "../../components/NavBar/NavBar";
import { fetchAndActivate, getRemoteConfig, getValue } from 'firebase/remote-config';
import { useEffect, useState } from 'react';

import './Home.css';

function Home(){
	const remote = getRemoteConfig();
	const [homeImage, setHomeImage] = useState(getValue(remote, "home_image").asString());
	useEffect(() => {
		fetchAndActivate(remote).then(() => {
			setHomeImage(getValue(remote, "home_image").asString())
		})
	}, [])
	return(
		<div className="flex-column flex-align-center">
			{/* <NavBar /> */}
			<img 
				style={{borderRadius: "20px"}} 
				className="mb-3 mt-5 construction-image" 
				alt="" 
				src={homeImage} 
			/>
			<small>This product is under construction</small>
			<small className='text-medium'>Want to join our dev team? Contacts: t.me/Andriannicolaev</small>
			<img draggable={false} style={{width: 20}} className="mt-3" src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Cc.logo.circle.svg" />
		</div>
	)
}

export default Home;