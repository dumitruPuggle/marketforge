import { Classes, Dialog } from "@blueprintjs/core";
import ReactFrappeChart from "react-frappe-charts";
import NativeButton from "../Buttons/NativeButton";
import { Carousel } from "react-responsive-carousel";
import { CSSProperties } from "react";

interface IStatsDialog {
  isOpen: boolean;
  onClose: () => void;
}

function StatsDialog({ isOpen, onClose }: IStatsDialog) {
  const indicatorStyles: CSSProperties = {
    background: "#BDBDBD",
    width: 8,
    height: 8,
    display: "inline-block",
    margin: "-12px 8px",
    borderRadius: "100%",
  };
  const handleRenderIndicator = (
    onClickHandler: any,
    isSelected: any,
    index: any,
    label: any
  ) => {
    if (isSelected) {
      return (
        <li
          style={{ ...indicatorStyles, background: "#000" }}
          aria-label={`Selected: ${label} ${index + 1}`}
          title={`Selected: ${label} ${index + 1}`}
        />
      );
    }
    return (
      <li
        style={indicatorStyles}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        title={`${label} ${index + 1}`}
        aria-label={`${label} ${index + 1}`}
      />
    );
  };
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => onClose()}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      isCloseButtonShown={false}
			hasBackdrop={false}
      title={"Statistics Usage"}
    >
      <div className={Classes.DIALOG_BODY}>
        <Carousel
          showThumbs={false}
          showIndicators={true}
					autoPlay={false}
          renderIndicator={handleRenderIndicator}
        >
          <div>
            <ReactFrappeChart
              type="line"
              lineOptions={{
                regionFill: 1,
              }}
              valuesOverPoints={1}
              animate={1}
              colors={["green"]}
              axisOptions={{
                xAxisMode: "tick",
                yAxisMode: "tick",
                xIsSeries: 1,
              }}
              height={250}
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                  {
                    values: [
                      138133, 131003, 128414, 115841, 129913, 82333, 58139,
                    ],
                  },
                ],
              }}
              title="User activity example (collected in a week):"
            />
          </div>
          <div>
						<ReactFrappeChart
							type="bar"
							colors={["orange"]}
							axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
							height={250}
							data={{
								labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
								datasets: [{ values: [18, 40, 30, 35, 8, 52, 17, 4] }],
							}}
						/>
          </div>
        </Carousel>
        <div className="p-2">
          <h3 style={{ fontWeight: 600, fontSize: 15 }}>
            Insights can help us understand better.
          </h3>
          <small>
            We care about your privacy, here at Fluency we do not sell your
            data. Instead with your permission we can segment our users
            (including you) into homogeneous groups and have a better
            understanding about the needs and possible improvements.
          </small>
          <ul className="mt-3">
            <li>Better search suggestions</li>
            <li className="mt-2">Immediate error fixes and security patches</li>
            <li className="mt-2">Advanced support</li>
          </ul>
          <small style={{ fontSize: 11 }}>
            You can cancel this option anytime in the settings menu.
          </small>
        </div>
      </div>
      <div className={`${Classes.DIALOG_FOOTER}`}>
        <div className="w-100" style={{paddingLeft: 20, paddingRight: 20}}>
          <NativeButton className="w-100" title="Share with Fluency" />
          <button
            style={{ fontSize: 18 }}
            className="w-100 mt-3 outline-button"
            onClick={() => onClose()}
          >
            Don't share
          </button>
        </div>
      </div>
    </Dialog>
  );
}

export default StatsDialog;
