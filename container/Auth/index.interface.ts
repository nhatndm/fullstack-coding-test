import { FormikHelpers } from "formik";

import { User } from "model/User";

export interface IProps {
  isLogin: boolean;
  formTitle: string;
  onSubmit: (user: User, formikHelpers: FormikHelpers<User>) => void;
}
