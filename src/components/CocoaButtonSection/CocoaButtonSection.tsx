
interface ICocoaButtonSection {
	children: React.ReactNode;
	className?: string;
	variant?: string | undefined;
	center?: boolean;
}

function CocoaButtonSection({
  children,
  variant,
  className = "",
	center = false,
  ...props
}: ICocoaButtonSection) {
  const defaultVariantStyle = {
    backgroundColor: "#e6e7ea",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
    position: "relative",
    zIndex: 0,
  };

	const transparentVariant = {

	}

	const calcStyle = () => {
		if (variant === "transparent"){
			return transparentVariant;
		}
		return defaultVariantStyle
	}
  return (
    <div
      style={calcStyle()}
      className={`${center ? 'flex-column flex-align-center' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default CocoaButtonSection;
