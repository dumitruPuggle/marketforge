import { CircularProgress } from "@mui/material";
import './LoadingForeground.css'


function LoadingForeground(){
    return (
        <div className="loading-foreground">
            <CircularProgress />
        </div>
    )
}

export default LoadingForeground;