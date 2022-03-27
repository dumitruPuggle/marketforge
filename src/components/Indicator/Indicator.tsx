import "./Indicator.css";
function Indicator({ value, counts, ...props }: any) {
  return (
    <div {...props} className={"indicator-container " + (props?.className)}>
      {[...Array(counts)].map((s, index) => {
        return <div key={index} className={"indicator-circle " + (index === value ? 'indicator-circle-active' : 'indicator-circle-inactive')} />;
      })}
    </div>
  );
}

export default Indicator;
