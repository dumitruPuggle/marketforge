import {
  Classes,
  DialogStep,
  InputGroup,
  MultistepDialog,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import InstagramAPIBase from "../../service/InstagramAPI/InstagramAPIBase";

interface IInstagramSetup {
  state: [boolean, Function];
}

export function InstagramSetup({ state }: IInstagramSetup) {
  const [dialog, setDialogVisible] = state;
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
      <DialogStep id="select" panel={<SearchInstagram />} title="Validate" />
    </MultistepDialog>
  );
}

function SearchInstagram() {
	const [query, setQuery] = useState('')
	const SearchInstagramInstance = new InstagramAPIBase()
	useEffect(() => {
		setTimeout(async () => {
			const {data} = await SearchInstagramInstance.getProfileInfo(query)
			console.log(data)
		}, 500)
	}, [query])
  return (
    <div className={Classes.DIALOG_BODY}>
      <InputGroup
        asyncControl={true}
        large={true}
        leftIcon="search"
				onChange={({target}) => setQuery(target.value)}
        placeholder="Search your account - @mycacasha"
      />
    </div>
  );
}

export default InstagramSetup;
