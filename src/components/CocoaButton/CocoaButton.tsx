import "./CocoaButton.css";

interface ICocoaButton {
  title: string;
  width: number;
  className?: string;
  onClick: () => void;
}

function CocoaButton({ title, width, className, onClick }: ICocoaButton) {
  return (
    <div
      onClick={onClick}
      style={{ width }}
      className={`NSCocoaButton ${className}`}
    >
      <div className="NSCocoaLabel">{title}</div>
      <div className="NSCocoaBlur"></div>
    </div>
  );
}

export default CocoaButton;
