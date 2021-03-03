import { User } from "model/User";

export interface IProps {
  isLogin: boolean;
  formTitle: string;
  onSubmit: (user: User) => void;
}
