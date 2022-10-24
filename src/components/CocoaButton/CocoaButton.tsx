import "./CocoaButton.css";

interface ICocoaButton {
  title: string;
  width: number;
  className?: string;
  style?: object;
  onClick: () => void;
}

function CocoaButton({ title, width, className, onClick, style = {} }: ICocoaButton) {
  return (
    <div
      onClick={onClick}
      style={{ width, ...style }}
      className={`NSCocoaButton ${className}`}
    >
      <div className="NSCocoaLabel">{title}</div>
      <div className="NSCocoaBlur"></div>
    </div>
  );
}

export default CocoaButton;
