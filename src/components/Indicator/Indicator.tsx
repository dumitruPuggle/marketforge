import i18n from "../../i18next";
import "./Indicator.css";

type Indicator = {
  value: number;
  counts: number;
  className?: string;
  showHighlight?: boolean;
};

function Indicator<T extends Indicator>({
  value,
  counts,
  showHighlight,
  ...props
}: T) {
  const language = i18n.language
  return (
    <div className={showHighlight ? `${props?.className}` : ""}>
      {showHighlight && (
        <small>
          {
            language === "en" &&
            `Step ${value + 1} of ${counts}`
          }
          {
            language === "ru" &&
            `Шаг ${value + 1} из ${counts}`
          }
          {
            language === "ro" &&
            `Pasul ${value + 1} din ${counts}`
          }
        </small>
      )}
      <div
        {...props}
        className={"indicator-container " + (!showHighlight ? props?.className : 'mt-2')}
      >
        {[...Array(counts)].map((s, index) => {
          return (
            <div
              key={index}
              className={
                "indicator-circle " +
                (index === value
                  ? "indicator-circle-active"
                  : "indicator-circle-inactive")
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default Indicator;
