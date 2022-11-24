import { Button } from "@mui/material";
import { accentColor } from "../../constant/colors";

const NativeButton = ({title, ...props}: any) => {
    return (
        <Button
        {...props}
        variant="contained"
        disableElevation
        style={{
          ...props.style,
          backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : accentColor,
          padding: '10px',
          borderRadius: '10px'
        }}
      >
        {title}
      </Button>
    )
}

export default NativeButton;