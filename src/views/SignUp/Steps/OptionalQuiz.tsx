import { InputAdornment, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import * as Yup from "yup";
import { useFormik } from "formik";
import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useHistory } from "react-router-dom";
// import * as Yup from "yup";
import NativeButton from "../../../components/Buttons/NativeButton";
import Indicator from "../../../components/Indicator/Indicator";
import Error from "../../../service/Auth/SignUp/ErrorHandler";
// import { routes } from "../../../service/internal-routes";
import ErrorBubble from "../../../components/ErrorBubble/ErrorBubble";
import LoadingForeground from "../../../components/LoadingForeground/LoadingForeground";
// import { SessionOne } from "../../../service/Auth/SignUp/SessionOne.Service";
import {
  indicatorTotalSteps,
  quizStep,
  userTypes,
  userTypesGenerics,
} from "../../../constant/SignUp.Constant";
import { useAtom } from "jotai";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
import { routes } from "../../../service/internal-routes";
import { useHistory } from "react-router-dom";
import WhoAreYouDialog from "../../../components/WhoAreYouDialog/WhoAreYouDialog";

type OptionalQuizState = {
  userType: string;
  companyName: string;
  numberOfEmployees: number;
};

interface OptionalQuizInterface {
  state: [OptionalQuizState, Function];
  setToken: Function;
}

function OptionalQuiz({ state, setToken }: OptionalQuizInterface) {
  const [totalSteps] = useAtom(indicatorTotalSteps);
  const { t } = useTranslation();
  const history = useHistory();

  const [optionalQuiz, setOptionalQuiz] = state;

  const errorsInitialState = {
    userType: "",
    companyName: "",
    numberOfEmployees: "",
    "*": "",
  };
  const [errors, setErrors] = useState(errorsInitialState);
  const ErrorHandler = new Error(errors, setErrors, errorsInitialState);

  const auth = getAuth();

  const transformToGenericClass = (raw: string) => {
    return userTypesGenerics[userTypes.indexOf(raw)]
  }

  const formik = useFormik({
    initialValues: {
      userType: optionalQuiz.userType,
      companyName: optionalQuiz.companyName,
      numberOfEmployees: optionalQuiz.numberOfEmployees,
    },
    validationSchema: Yup.object({
      userType: Yup.string().required(t("required")),
    }),
    onSubmit: async function (values: OptionalQuizState): Promise<void> {
      const db = getFirestore();
      const uid = getAuth()?.currentUser?.uid;
      const valuesAreEmpty =
        values.companyName.length === 0 &&
        values.numberOfEmployees.toString.length === 0;
      try {
        if (valuesAreEmpty) {
          await setDoc(doc(db, `/users/${uid}/other-data/optional-quiz`), {
            skipped_optional_data_section: true,
          });
        } else {
          await setDoc(doc(db, `/users/${uid}/other-data/optional-quiz`), {
            company_name: values.companyName,
            number_of_employees: values.numberOfEmployees,
            skipped_optional_data_section: false,
          });
        }
        await updateDoc(doc(db, `/users/${uid}`), {
          user_type: transformToGenericClass(values.userType)
        })
      } catch (e) {
        ErrorHandler.setFieldError("*", t("unknownError"));
      }
      // Finish
      history.push(`${routes.SignUp}/${routes.SignUpSteps.finish}`);
    },
  });
  

  // Reset the token to avoid going through errors
  useEffect(() => setToken(""), []);

  const titleMsg = t("tell-us-a-bit-more-about-you");

  const [whoAreYouPrompt, openSelectWhoAreYou] = useState(false);

  const handleSelectWhoAreYou = () => {
    openSelectWhoAreYou(true);
  };

  const handleSelectOption = (result: string) => {
    formik.setValues({
      ...formik.values,
      userType: result,
    });
  };

  const whoAreYouError = Boolean(
    formik.errors.userType && formik.touched.userType
  );

  return (
    <form className="form-global" onSubmit={formik.handleSubmit}>
      {ErrorHandler.hasErrors() && (
        <ErrorBubble errorList={ErrorHandler.listErrors()} />
      )}
      {formik.isSubmitting && <LoadingForeground />}
      <h4 className="form-title mb-2">
        {auth.currentUser?.displayName?.split(" ")[0]},{" "}
        {titleMsg.toLocaleLowerCase()}
      </h4>
      <small className="mb-3">{t("you-can-skip-this-section")}</small>
      <Indicator className="mb-4" value={quizStep} counts={totalSteps} />
      {/* <UserTypeInput
        className="mb-3"
        userType={userType}
        list={userTypes}
        onSelect={handleUserTypeSelect}
      /> */}
      <WhoAreYouDialog
        state={whoAreYouPrompt}
        onCloseDialog={() => {
          openSelectWhoAreYou(false);
        }}
        onSelectOption={handleSelectOption}
      />
      <TextField
        error={whoAreYouError}
        onClick={handleSelectWhoAreYou}
        disabled={true}
        value={t(formik.values.userType)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <hr style={{ backgroundColor: "transparent" }} />
      <TextField
        helperText={formik.errors.companyName}
        id="demo-helper-text-misaligned"
        label={t("organisation-name-optional")}
        name="companyName"
        type="text"
        className="mb-3"
        // error={emailError}
        size={"small"}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.companyName}
      />
      <TextField
        helperText={formik.errors.numberOfEmployees}
        id="demo-helper-text-misaligned"
        label={t("number-of-employees-optional")}
        name="numberOfEmployees"
        type="number"
        className="mb-3"
        size={"small"}
        // error={emailError}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={
          formik.values.numberOfEmployees > 0
            ? formik.values.numberOfEmployees
            : null
        }
      />
      <NativeButton className="mt-3" type="submit" title={t("next")} />
    </form>
  );
}

export default OptionalQuiz;
