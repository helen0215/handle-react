import React, { useState, Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import loadable from '@loadable/component';

/** Loadable Components를 이용한 코드 스플리팅 **/
// Loadable Components 는 코드 스플리팅을 도와주는 서드파티 라이브러리 
// SSR 지원 (React.lazy, Suspense는 SSR 미지원)
// 스플리팅된 파일을 미리 불러올 수 있는 기능도 제공 

const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

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
        {visible && <SplitMe />}
      </header>
    </div>
  );
  
}

export default App;
