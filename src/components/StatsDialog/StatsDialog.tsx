import { Classes, Dialog } from "@blueprintjs/core";
import NativeButton from "../Buttons/NativeButton";

interface IStatsDialog {
  isOpen: boolean;
  onClose: () => void;
}

function StatsDialog({ isOpen, onClose }: IStatsDialog) {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => onClose()}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      isCloseButtonShown={false}
			hasBackdrop={false}
      style={{width: 400}}
      title={"Statistics Usage"}
    >
      <div className={Classes.DIALOG_BODY}>
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
        <div className="w-100" style={{paddingLeft: 8, paddingRight: 8}}>
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
