import "./ErrorBubble.css";
import { IoCloseOutline } from "react-icons/io5";
import { errorTypeItem } from "../../service/Auth/SignUp/ErrorHandler";

interface IErrorBubble {
  errorList: errorTypeItem[];
  onClear?: (id: number) => void;
}

function ErrorBubble({ errorList, onClear }: IErrorBubble) {
  return (
    <>
      {errorList.map((error: errorTypeItem, index: number) => {
        return (
          <>
            <p key={index} className="error-message mb-2">
              {error.message}
							{
								onClear &&
								<div
									onClick={() => onClear && onClear(error.id)}
									className="error-message-close center"
								>
									<IoCloseOutline />
								</div>
							}
            </p>
          </>
        );
      })}
    </>
  );
}

export default ErrorBubble;
