import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store/index';
import { addUp, addDown } from '../../../../store/ducks/elevator';
import { addWaiting } from '../../../../store/ducks/humans';

import RedButton from '../../../../assets/redButton.svg';
import GreenButton from '../../../../assets/greenButton.svg';

import './FloorController.scss';

interface FloorControllerProps {
  id: number;
}

const FloorController: React.FC<FloorControllerProps> = props => {
  const { id } = props;

  const [isButtonActive, setButtonActive] = useState(false);
  const [elevateTo, setElevateTo] = useState(id);

  const dispatch = useDispatch();
  const elevatorFloor = useSelector((state: RootState) => state.elevator.floor);
  const elevatorUps = useSelector((state: RootState) => state.elevator.ups);
  const elevatorDowns = useSelector((state: RootState) => state.elevator.downs);
  const isElevatorOpen = useSelector((state: RootState) => state.elevator.moving === false);

  const isElevatorOpenAndOnThisFloor = elevatorFloor === id && isElevatorOpen;

  const nextHumanIdAvailable = useSelector((state: RootState) => state.humans.id);

  useEffect(() => {
    if (isElevatorOpenAndOnThisFloor) {
      setButtonActive(false);
    }
  }, [isElevatorOpenAndOnThisFloor]);

  const handleClick = () => {
    setButtonActive(true);
    if (elevateTo === id) {
      return setTimeout(() => setButtonActive(false), 200);
    }

    if (elevateTo > id) {
      if (elevatorUps.every((elevatorUp: number) => elevatorUp !== id)) {
        dispatch(addUp(elevateTo));
      }
    } else {
      if (elevatorDowns.every((elevatorDown: number) => elevatorDown !== id)) {
        dispatch(addDown(id, elevateTo));
      }
    } 
    dispatch(addWaiting(nextHumanIdAvailable, id));
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>)  => {
    setElevateTo(+event.currentTarget.value);
  }

  return (
    <div className='controller__container'>
      <input value={elevateTo} onChange={handleChange} className='controller__input' />
      <img src={isButtonActive ? GreenButton : RedButton} alt='Button' onClick={handleClick} className='controller__button' />
    </div>
  );
};

export default FloorController;
