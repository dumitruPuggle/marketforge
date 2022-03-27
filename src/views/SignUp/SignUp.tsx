import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Back from '../../components/Back/Back';
import { useTranslation } from 'react-i18next'
import './SignUp.css'
import { useState } from 'react';
import Indicator from '../../components/Indicator/Indicator';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

function SignUp() {
  let { path } = useRouteMatch();
  const history = useHistory()
  const [state, setState] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
    },
    verification: {
      phoneNumber: ''
    }
  })
  const onPersonalInfoSubmitted = (values: any) => {
    setState({...state, personalInfo: values})
    history.push(`${path}/1`)
  }
  const onVerificationSubmitted = (values: any) => {
    setState({...state, verification: values})
    
  }
  return (
    <div className='row sign-up-row'>
      <Back />
      <div className='col pt-5 sign-up-left'>
        
      </div>
      <div className='col'>
        <div className='form-center mt-5'>
          <Switch>
            <Route exact path={`${path}`}>
              <PersonInfo defValues={state.personalInfo} onSubmit={onPersonalInfoSubmitted}/>
            </Route>
            <Route exact path={`${path}/1`}>
              <Verification defValues={state.verification} onSubmit={onVerificationSubmitted}/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

const PersonInfo = ({onSubmit, defValues}: any) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      firstName: defValues.firstName,
      lastName: defValues.lastName,
      email: defValues.email,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required(t('required')),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required(t('required')),
      email: Yup.string().email(t('invalidAddress')).required(t('required'))
    }),
    onSubmit: values => {
      onSubmit(values)
    },
  });
  return (
    <form
      className='form-global'
      onSubmit={formik.handleSubmit}>
      <h4 className='mb-4 form-title'>{t('signup')}</h4>
      <Indicator className="mb-4" value={0} counts={2}/>
      <TextField
        helperText={formik.errors.firstName}
        id="demo-helper-text-misaligned"
        label={t('firstName')}
        name="firstName"
        className='mb-3'
        type="name"
        error={(formik.errors.firstName && formik.touched.firstName) ? true : false}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      <TextField
        helperText={formik.errors.lastName}
        id="demo-helper-text-misaligned"
        label={t('lastName')}
        name="lastName"
        className='mb-3'
        type="name"
        error={(formik.errors.lastName && formik.touched.lastName) ? true : false}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      <TextField
        helperText={formik.errors.email}
        id="demo-helper-text-misaligned"
        label={t('email')}
        name="email"
        type="email"
        className='mb-3'
        error={(formik.errors.email && formik.touched.email) ? true : false}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      <Button variant="contained" disableElevation className='mt-3' type="submit">{t('next')}</Button>
      <hr />
      <small className='w-100 form-disclaimer'>
        BEFORE YOU GET STARTED, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </small>
    </form>
  );
};

const Verification = ({onSubmit, defValues}: any) => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      phoneNumber: defValues.phoneNumber
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.number()
    }),
    onSubmit: values => {
      onSubmit(values)
    },
  });
  return (
    <form
      className='form-global'
      onSubmit={formik.handleSubmit}>
      <h4 className='mb-4 form-title'>{t('verification')}</h4>
      <Indicator className="mb-4" value={1} counts={2}/>
      <TextField
        helperText={formik.errors.phoneNumber}
        id="demo-helper-text-misaligned"
        label={t('phoneNumber')}
        name="phoneNumber"
        className='mb-3'
        placeholder='+373 (000)-000-00'
        type="phone"
        error={(formik.errors.phoneNumber && formik.touched.phoneNumber) ? true : false}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
      />
      <Button variant="contained" disableElevation className='mt-3' type="submit">{t('next')}</Button>
      <hr />
      <small className='w-100 form-disclaimer'>
        BEFORE YOU GET STARTED, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </small>
    </form>
  );
};
export default SignUp;
