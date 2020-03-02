import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

import FloorController from './components/FloorController/FloorController';
import Human from '../Human/Human';

import OpenFloor from '../../assets/openFloor.png';
import ClosedFloor from '../../assets/closedFloor.png';

import './Floor.scss';

interface FloorProps {
  id: number;
}

const Floor: React.FC<FloorProps> = props => {
  const { id } = props;

  const isElevatorOnThisFloor = useSelector((state: RootState) => state.elevator.floor) === id;
  const isElevatorNotMoving = useSelector((state: RootState) => !state.elevator.moving);
  const isOpen = isElevatorOnThisFloor && isElevatorNotMoving;

  const humansWaiting = useSelector((state: RootState) => state.humans.waiting);
  const humanWaitingHere = humansWaiting.find(humanWaiting => humanWaiting.floor === id);
  if (humanWaitingHere) {
    console.log("TEM ALGUEM ESPERANDO");
  }

  return (
    <div className="floor">
      <img src={isOpen ? OpenFloor : ClosedFloor} alt='floor' />
      <div className="floor__human-waiting">
        {humanWaitingHere ? <Human id={humanWaitingHere.id} /> : null}
      </div>
      <div className="floor__controller">
        <FloorController id={id} />
      </div>
      <div className="floor__number">
        {id}
      </div>
    </div>
  );
}

export default Floor;