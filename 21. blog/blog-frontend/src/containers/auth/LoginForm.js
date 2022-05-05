import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { AUTH_TYPE } from '../../lib/constants';
import { check } from '../../modules/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const {form, auth, authError, user} = useSelector(({auth, user}) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  // 인풋 변경 이벤트 헨들러
  const onChange = e => {
    const {value, name} = e.target;
    dispatch(
      changeField({
        form: AUTH_TYPE.LOGIN,
        key: name,
        value
      })
    );
  };

  // TODO: 폼 등록 이벤트 핸들러 구현
  const onSubmit = e => {
    e.preventDefault();
    const {username, password} = form;
    dispatch(login({username, password}));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화 함
  useEffect(() => {
    dispatch(initializeForm(AUTH_TYPE.LOGIN));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log('authError');
      return;
    }
    if (auth) {
      console.log('login 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/'); // 홈 화면으로 이동
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type={AUTH_TYPE.LOGIN}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
};

export default LoginForm;