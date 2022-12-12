import { getAuth, signOut } from "firebase/auth";
import { useAtom } from "jotai";
import { isUserAuthed } from "../../App";
import "./UserCircle.css";

function UserCircle() {
  const [, setUserAuthenticated] = useAtom(isUserAuthed);
  const handleClick = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUserAuthenticated(false);
  };
  return (
    <div onClick={() => handleClick()} className="user-circle-control"></div>
  );
}

export default UserCircle;
