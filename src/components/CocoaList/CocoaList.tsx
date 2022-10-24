import "./CocoaList.css";


interface ICocoaList {
  width?: number;
  className?: string;
  style?: object;
  height: number;
  onClick?: () => void;
	data: object[];
	setData: Function;
}

function CocoaList({
  width,
  className,
  onClick,
  height,
  style = {},
	data,
	setData
}: ICocoaList) {
	const handleItemClick = (id: any) => {
		const newList = (prev: any) => {
				return [
					...prev.map((item: any) => {
						if (item.id === id){
							return {
								...item,
								highlighted: !item.highlighted
							}
						}
						return {...item, highlighted: false};
					})
				]
		}
		setData((prev: any) => [...newList(prev)])
	}
  return (
    <div style={{ height, ...style }} className="NSCocoaList">
      {data.map((item: any) => {
        const bold = Boolean(item.bold);
        return (
          <CocoaListItem
            key={item.id}
						id={item.id}
            text={item.text}
            highlighted={item.highlighted}
            onSelect={handleItemClick}
            bold={bold}
          />
        );
      })}
    </div>
  );
}

function CocoaListItem({
	id,
  text,
  highlighted,
  onSelect,
  bold = false
}: {
	id: any,
  text: string;
  highlighted: boolean;
  bold?: boolean;
  onSelect: Function;
}) {
  const fontWeight = bold ? 700 : 400
  return (
    <div
      onClick={() => onSelect(id)}
      className={`${"NSCocoaListItem"} ${
        highlighted && "NSCocoaListItemHighlight"
      }`}
    >
      <small style={{ fontSize: 11, fontWeight }}>{text}</small>
    </div>
  );
}

export default CocoaList;
