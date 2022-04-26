import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { AUTH_TYPE } from '../../lib/constants';

const LoginForm = () => {
  const dispatch = useDispatch();
  const {form} = useSelector(({auth}) => ({
    form: auth.login
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
  };

  // 컴포넌트가 처음 렌더링 될 때 form을 초기화 함
  useEffect(() => {
    dispatch(initializeForm(AUTH_TYPE.LOGIN));
  }, [dispatch]);

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