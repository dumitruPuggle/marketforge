import { Classes, Dialog } from '@blueprintjs/core';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SRadar } from '../../service/ServerRadar/ServerRadar.Service';
import './RadarDialog.css'


function RadarDialog({state}: {state: [boolean, Dispatch<SetStateAction<boolean>>]}){
	const [radarDialog, setRadarDialog] = state;
	const [dots, setDots] = useState([[50, 20, 0]])
	const randomNumber = (max: number) => {
		return Math.floor(Math.random() * max);
	}
	useEffect(() => {
		if (radarDialog){
			const Radar = new SRadar();
			const interval = setInterval(async () => {
				const result = await Radar.scan()
				const isWorking = [result.baseApiOK, result.backupApiOk].some((value) => value === true)
				for (let i = 0; i < 5; i++){
					setDots([...dots, [randomNumber(100), randomNumber(100), randomNumber(100)]])
				}
				if (isWorking){
					setRadarDialog(false)
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [radarDialog])

    return (
			<Dialog
				isOpen={radarDialog}
				title={"Service check..."}
				isCloseButtonShown={false}
			>
        <div 
					className={Classes.DIALOG_BODY} 
					style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
						<div className="spinner mt-4 mb-4 radar-background shine">
							<img draggable={false} className="map" src="https://static.gosquared.com/images/ui/neo/bg_map_01@3x.png"/>
							{
								dots.map((position) => {
									return <span className="dot" style={{top: position[0], left: position[1], right: position[2]}}/>
								})
							}
						</div>
					</div>
					<div className={Classes.DIALOG_FOOTER}>
						<small>We apologise for the delay, you should wait. The server is currently down, the inbuilt application engine is trying to find the most suitable service.</small>
					</div>
      </Dialog>
    )
}

export default RadarDialog;