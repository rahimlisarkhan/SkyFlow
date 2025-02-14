import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Typography, Card } from 'antd';
import styles from '@/common/theme/login.module.css';
import { useAppDispatch } from '@/common/store';
import { loginUser } from '@/common/store/slices/authSlice';
import withRoleGuard, { CheckType } from '@/common/hoc/withRoleGuard';
import MetaSeo from '@/common/components/MetaSeo';
import { ILogin } from '@/types/auth.types';
import { useTranslation } from 'next-i18next';
import TextInput from '@/common/components/TextInput';

const { Title } = Typography;

function Login() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, t('Password must be at least 6 characters!'))
      .max(20, t('Password must be at most 20 characters!'))
      .required('Please enter your email!'),
    password: Yup.string()
      .min(6, t('Password must be at least 6 characters!'))
      .max(20, t('Password must be at most 20 characters!'))
      .required('Please enter your password!'),
  });

  const formik = useFormik<ILogin>({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const resultAction = dispatch(loginUser(values));

      if (loginUser.fulfilled.match(resultAction)) {
        //We have auto redirect in withRoleGuard hoc.if you have a user
        resetForm();
      }
    },
  });

  return (
    <div className={styles.container}>
      <MetaSeo title="Login | Skyflow" description="Lorem ipsum" />

      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          Login to SkyFlow
        </Title>

        {/* Email Field */}
        <TextInput
          label="Username"
          name="username"
          placeholder="Enter your email"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
        />

        {/* Password Field */}
        <TextInput
          label="Password"
          name="password"
          password
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
        />

        {/* Login Button */}
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => formik.handleSubmit()}
          block
        >
          Login
        </Button>
      </Card>
    </div>
  );
}

export default withRoleGuard(Login, CheckType.USER);
