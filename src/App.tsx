import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from './store/index';

import Menu from './components/Menu/Menu';
import Building from './components/Building/Building';
import Elevator from './components/Elevator/Elevator';

import './App.scss';

const App: React.FC = () => {
  const height = useSelector((state: RootState) => state.building.height);

  return (
    <div className='app'>
      <Menu />
      <Building height={height} />
      <Elevator height={height} />
    </div>
  );
};

export default App;
