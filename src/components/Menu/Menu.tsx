import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { setHeight } from '../../store/ducks/building';

const Menu: React.FC = () => {
  const initialHeight = useSelector((state: RootState) => state.building.height);

  const dispatch = useDispatch();

  const [height, setStateHeight] = useState(initialHeight);

  const handleHeightChange = (event: React.FormEvent<HTMLInputElement>)  => {
    setStateHeight(+event.currentTarget.value);
  }

  const handleHeightSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setHeight(height));
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
    </div>
  );
}

export default Menu;
