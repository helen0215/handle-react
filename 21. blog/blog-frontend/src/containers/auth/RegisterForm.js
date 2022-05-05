import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { AUTH_TYPE } from '../../lib/constants';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const {form, auth, authError, user} = useSelector(({auth, user}) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 헨들러
  const onChange = e => {
    const {value, name} = e.target;
    dispatch(
      changeField({
        form: AUTH_TYPE.REGISTER,
        key: name,
        value
      })
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const {username, password, passwordConfirm} = form;
    if (password !== passwordConfirm) {
      // TODO: 오류처리
      return;
    }
    dispatch(register({username, password}));
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화 함
  useEffect(() => {
    dispatch(initializeForm(AUTH_TYPE.REGISTER));
  }, [dispatch]);

  // 회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }

    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/'); // 홈 화면으로 이동
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type={AUTH_TYPE.REGISTER}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  )
};

export default RegisterForm;