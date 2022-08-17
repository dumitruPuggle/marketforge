import { useEffect, useState } from "react"
import './Timer.css'

export default function Timer({endTime}: {endTime: number}) {
    const [time, setTime] = useState<string>()
    const [isExpired, setExpirated] = useState<boolean>(false)
    //Display how much time is left until the endTime in MM:SS format
    let interval: any;
    const getTimeLeft = () => {
        const now = new Date().getTime()
        const timeLeft = endTime - now
        const minutes = Math.floor(timeLeft / (1000 * 60))
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
        const output = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

        //If the time is expired, call the onExpire function
        if (timeLeft < 0) {
            setExpirated(true)
            clearInterval(interval)
            interval = null
        }
        return output
    }
    useEffect(() => {
        interval = setInterval(() => setTime(getTimeLeft()), 1000)
    }, [])
    if (time && !isExpired) return (
        <div style={{width: '90px'}} className="timer-body">
            <pre className="timer-text mb-0">{time}</pre>
            {/* <small>left until 💣</small> */}
        </div>
    )
    return <></>
}