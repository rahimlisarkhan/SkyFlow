import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Typography, Card } from "antd";
import styles from "./LoginForm.module.css";
import { useAppDispatch } from "@/common/store";
import { loginUser } from "@/common/store/slices/authSlice";
import { ILogin } from "@/types/auth.types";
import { useTranslation } from "next-i18next";
import TextInput from "@/common/components/TextInput";

const { Title } = Typography;

function LoginForm() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(6, t("validation.username_min"))
      .max(20, t("validation.username_max"))
      .required(t("validation.username_required")),
    password: Yup.string()
      .min(6, t("validation.password_min"))
      .max(20, t("validation.password_max"))
      .required(t("validation.password_required")),
  });

  const formik = useFormik<ILogin>({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const resultAction = dispatch(loginUser(values));

      if (loginUser.fulfilled.match(resultAction)) {
        resetForm();
      }
    },
  });

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2} className={styles.title}>
          {t("login")}
        </Title>

        <TextInput
          label={t("form.username")}
          name="username"
          placeholder={t("form.username_placeholder")}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.username}
        />

        <TextInput
          label={t("form.password")}
          name="password"
          password
          placeholder={t("form.password_placeholder")}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
        />

        <Button type="primary" onClick={() => formik.handleSubmit()} block>
          {t("login")}
        </Button>
      </Card>
    </div>
  );
}

export default LoginForm;
