import { Button } from "@mui/material";

const NativeButtonPillow = ({title, ...props}: any) => {
    return (
        <Button
        {...props}
        variant="contained"
        disableElevation
        style={{
          ...props.style,
          backgroundColor: props.style?.backgroundColor ? props.style?.backgroundColor : '#007AFF',
          borderRadius: '20px',
          paddingTop: '2px',
          paddingBottom: '2px',
          fontWeight: 'bold'
        }}
      >
        {title}
      </Button>
    )
}

export default NativeButtonPillow;