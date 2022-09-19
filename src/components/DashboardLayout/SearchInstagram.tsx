import {
  Classes,
  DialogStep,
  MultistepDialog,
} from "@blueprintjs/core";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface IInstagramSetup {
  state: [boolean, Function];
}

export function InstagramSetup({ state }: IInstagramSetup) {
  const [dialog, setDialogVisible] = state;
  const [username, setUsername] = useState<string>('');
  const isMobile = useMediaQuery({ maxWidth: 830 });

  if (isMobile && dialog) {
    return <div>Mobile</div>;
  }

  return (
    <MultistepDialog
      title={"Validate account"}
      isOpen={dialog}
      isCloseButtonShown={true}
      navigationPosition="left"
      onClose={() => setDialogVisible(false)}
    >
      <DialogStep id="select" panel={<SearchInstagram onChange={(value: string) => setUsername(value)}/>} title="Validate" />
      {/* <DialogStep id="select" panel={<ViewProfile username={username} />} title="View" /> */}
    </MultistepDialog>
  );
}

function SearchInstagram({onChange}: {onChange: (a: string) => void;}) {
  return (
    <div className={Classes.DIALOG_BODY}>
      <TextField onChange={(e) => onChange(e.target.value)} className="w-100" label="Instagram" color="primary" focused />
    </div>
  );
}

export default InstagramSetup;
