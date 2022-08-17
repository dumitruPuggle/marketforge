import tiktokIcon from "../../assets/tiktok-icon.svg";
import { useTranslation } from "react-i18next";
import "./Platforms.css";

export enum PlatformsEnum {
  Instagram,
  TikTok,
  Facebook,
}

interface IPlatforms {
  onSelect(arg: PlatformsEnum): void;
}

function Platforms({ onSelect }: IPlatforms) {
  return (
    <div className="row mt-2 platforms-row-center">
      <Item
        name={"Instagram"}
        icon={
          "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
        }
        onClick={() => onSelect(PlatformsEnum.Instagram)}
        style={{ width: 40 }}
      />
      <Item
        name={"TikTok"}
        icon={tiktokIcon}
        onClick={() => onSelect(PlatformsEnum.TikTok)}
        style={{ width: 50 }}
      />
      <Item
        name={"Facebook"}
        icon="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
        onClick={() => onSelect(PlatformsEnum.Facebook)}
        style={{ width: 40 }}
      />
    </div>
  );
}

function Item({
  name,
  icon,
  onClick,
  style,
}: {
  name: string;
  icon: string;
  onClick: Function;
  style?: object;
}) {
  const { t } = useTranslation();
  return (
    <div onClick={() => onClick()} className="col platform-card">
      <img draggable={false} src={icon} style={{ ...style }} alt="" />
      <div className="plaforms-desc p-2">
        <p className="mb-1 platform-title">{name}</p>
        <small>{t("clickToSelect")}</small>
      </div>
    </div>
  );
}

export default Platforms;
