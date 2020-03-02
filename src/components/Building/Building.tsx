import React from 'react';

import Floor from '../Floor/Floor';

import './Building.scss';

interface BuildingProps {
  height: number;
}

const Building: React.FC<BuildingProps> = props => {
  const { height } = props;

  const floors = [];

  for (let i = 0; i < height; i++) {
    floors.push(<Floor id={height-1 - i} key={height-1 - i} />);
  }

  return (
    <div className="building">
      {floors}
    </div>
  );
}

export default Building;
