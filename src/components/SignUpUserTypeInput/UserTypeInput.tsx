import { t } from "i18next";
import "./UserTypeInput.css";

interface IUserTypeInput {
  userType: string;
  list: string[];
  className: string;
  style?: object;
  onSelect: (value: string) => void;
  hidden?: boolean;
}

export const UserTypeInput = ({
  userType,
  list,
  onSelect,
  hidden,
  ...props
}: IUserTypeInput) => {
  const handleButtonClick = (value: string) => {
		onSelect(value);
  };
  if (hidden){
    return <div className={props.className}></div>
  }
  return (
    <div
      className={`${props.className} user-type-input-selector`}
      style={{ ...props?.style }}
    >
      <select
        className="select-user-type"
        defaultValue={userType}
				onChange={(e) => handleButtonClick(e.target.value)}
        name="userTypes"
      >
        {list.map((userType) => {
          return (
            <option
              value={userType}
            >
              {t(userType)}
            </option>
          );
        })}
      </select>
    </div>
  );
};
