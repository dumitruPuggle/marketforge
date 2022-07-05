import { Button } from "@mui/material";

const NativeButton = ({title, ...props}: any) => {
    return (
        <Button
        {...props}
        variant="contained"
        disableElevation
        style={{
          ...props.style,
          backgroundColor: props?.style?.backgroundColor ? props?.style?.backgroundColor : '#007AFF',
          padding: '10px',
          borderRadius: '10px'
        }}
      >
        {title}
      </Button>
    )
}

export default NativeButton;