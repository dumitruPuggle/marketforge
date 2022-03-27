import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Back from '../../components/Back/Back';
import { useTranslation } from 'react-i18next'
import './SignUp.css'


function SignUp() {
  return (
    <div className='row sign-up-row'>
      <Back />
      <div className='col-12 col-md-6 pt-5 sign-up-left'>
        Hello
      </div>
      <div className='col-md-6'>
        <div className='form-center mt-5'>  
          <PersonInfo />
        </div>
      </div>
    </div>
  )
}

const PersonInfo = () => {
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form
      className='form-global'
      onSubmit={formik.handleSubmit}>
      <h4 className='mb-4 form-title'>{t('signup')}</h4>
      <TextField
        helperText={formik.errors.firstName}
        id="demo-helper-text-misaligned"
        label={t('firstName')}
        name="firstName"
        className='mb-3'
        type="name"
        error={formik.errors.firstName !== undefined && formik.touched.firstName}
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
        error={formik.errors.lastName !== undefined && formik.touched.lastName}
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
        error={formik.errors.email !== undefined && formik.touched.email}
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
export default SignUp;
