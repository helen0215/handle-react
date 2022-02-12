import React from 'react';
import Sample from '../components/Sample';
import { getPost, getUsers } from '../modules/sample';
import { connect } from 'react-redux';

const { useEffect } = React;
const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers
}) => {
  // 클래스 형태였다면 componentDidMount
  useEffect(() => {
    // 실패 액션을 컴포넌트에서 조회해보기
    // useEffect에 파라미터로 넣는 함수는 async로 할 수 없기 때문에 내부에서 async 함수 선언 후 호출
    const fn = async () => {
      try {
        await getPost(1);
        await getUsers(1);
      } catch (e) {
        console.log(e); // 에러조회
      }
    }
    fn();
  }, [getPost, getUsers]);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
  ({ sample, loading }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: loading['sample/GET_POST'],
    loadingUsers: loading['sample/GET_USERS']
  }),
  {
    getPost,
    getUsers
  }
)(SampleContainer);
