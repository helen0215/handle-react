import React, { useState, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';

/** React.lazy, Suspense를 사용한 코드 스플리팅 **/
// React.lazy는 컴포넌트를 렌더링 하는 시점에서 비동기 적으로 로딩할 수 있게 해주는 유틸함수
/*
 * 예)
  const SplitMe = React.lazy(() => import('./SplitMe'));
*/

// Suspense는 리액트 내장 컴포넌트 로서 코드 스플리팅된 컴포넌트를 로딩하도록 발동 시킬 수 있음
// 로딩이 끝나지 않았을때 보여줄 UI를 설정 할 수 있음
// fallback props를 통해 로딩중에 보여줄 JSX를 지정할 수 있음
/*
 * 예)
  import { Suspense } from 'react';

  (...)
  <Suspense fallback={<div>loading...</div>}>
    <SplitMe />
  </Suspense>
*/

const SplitMe = React.lazy(() => import('./SplitMe'));

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>
          Hello React
        </p>
        <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  );
  
}

export default App;
