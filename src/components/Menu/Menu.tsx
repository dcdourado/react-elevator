import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { setHeight, setSpeed } from '../../store/ducks/building';

const Menu: React.FC = () => {
  const initialHeight = useSelector((state: RootState) => state.building.height);
  const initialSpeed = useSelector((state: RootState) => state.building.speed);

  const dispatch = useDispatch();

  const [height, setStateHeight] = useState(initialHeight);
  const [speed, setStateSpeed] = useState(initialSpeed);

  const handleHeightChange = (event: React.FormEvent<HTMLInputElement>)  => {
    setStateHeight(+event.currentTarget.value);
  }

  const handleHeightSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setHeight(height));
  }

  const handleSpeedChange = (event: React.FormEvent<HTMLInputElement>)  => {
    setStateSpeed(+event.currentTarget.value);
  }

  const handleSpeedSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("OI");
    dispatch(setSpeed(speed));
  }

  return (
    <div className='menu'>
      <div className='menu__item'>
        <span>Height</span>
        <form onSubmit={handleHeightSubmit}>
          <input value={height} onChange={handleHeightChange} />
          <button type="submit">OK</button>
        </form>
      </div>
      <div className='menu__item'>
        <span>Speed</span>
        <form onSubmit={handleSpeedSubmit}>
          <input value={speed} onChange={handleSpeedChange} />
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  );
}

export default Menu;
