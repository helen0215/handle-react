import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import { AUTH_TYPE } from '../lib/constants';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <AuthForm type={AUTH_TYPE.LOGIN} />
    </AuthTemplate>
  )
};

export default LoginPage;
