import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import { AUTH_TYPE } from '../lib/constants';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type={AUTH_TYPE.REGISTER} />
    </AuthTemplate>
  )
};

export default RegisterPage;
