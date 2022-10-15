// import NavBar from "../../components/NavBar/NavBar";
import { fetchAndActivate, getRemoteConfig, getValue } from 'firebase/remote-config';
import { useEffect, useState } from 'react';
import HundredPercentImage from '../../assets/100-percent-image.png'

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
			<div className='mt-3 p-2 flex-row flex-align-center'>
				<img draggable={false} style={{width: 64, marginRight: 10}} src={HundredPercentImage} />
				<div className='flex-column flex-center-left'>
					<small style={{fontSize: 14, fontWeight: 600}}>Fluency is 100% policy-free</small>
					<small>We do not restrict our clients, regardless of their nationality</small>
					<small style={{color: 'thistle'}}>#WeAreAllHumans</small>
				</div>
			</div>
			<img 
				style={{borderRadius: "20px"}} 
				className="mb-3 mt-3 construction-image" 
				alt="" 
				src={homeImage} 
			/>
			<small>This product is under construction</small>
			<small className='text-medium'>Want to join our dev team? Contacts: t.me/Andriannicolaev</small>
		</div>
	)
}

export default Home;