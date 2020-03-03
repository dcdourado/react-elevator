import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { up, down, open, removeUp, removeDown } from '../../store/ducks/elevator';
import { removeWaiting, removeActive, addActive } from '../../store/ducks/humans';

import Human from '../Human/Human';

import CableImg from '../../assets/cable.png';
import ElevatorImg from '../../assets/elevator.png';

import './Elevator.scss';

interface ElevatorProps {
  height: number;
}

const Elevator: React.FC<ElevatorProps> = props => {
  const { height } = props;

  const dispatch = useDispatch();

  const activeFloor = useSelector((state: RootState) => state.elevator.floor);

  const activeFloorRef = useRef(activeFloor);
  activeFloorRef.current = activeFloor;

  const ups = useSelector((state: RootState) => state.elevator.ups);
  const downs = useSelector((state: RootState) => state.elevator.downs);

  const [movingUp, setMovingUp] = useState<undefined | boolean>(undefined);
  const movingUpRef = useRef(movingUp);
  movingUpRef.current = movingUp;

  const [stopFloors, setStopFloors] = useState<number[]>([]);
  const stopFloorsRef = useRef(stopFloors);
  stopFloorsRef.current = stopFloors;

  const humansWaiting = useSelector((state: RootState) => state.humans.waiting);
  const humansWaitingRef = useRef(humansWaiting);
  humansWaitingRef.current = humansWaiting;

  const humansActive = useSelector((state: RootState) => state.humans.active);
  const humansActiveRef = useRef(humansActive);
  humansActiveRef.current = humansActive;

  useEffect(() => {
    const elevator = setInterval(() => {
      elevate();
    }, 2000);
    return () => clearInterval(elevator);
    // eslint-disable-next-line
  }, []);

  const elevate = () => {
    if (stopFloorsRef.current.length === 0) {
      setMovingUp(undefined);
    }
    if (movingUpRef.current === undefined) {
      return;
    }

    if (stopFloorsRef.current[0] === activeFloorRef.current) {
      console.log("OPEN");
      dispatch(open());
      const humanWaitingOnThisFloor = humansWaitingRef.current.find(human => human.from === activeFloorRef.current);
      if (humanWaitingOnThisFloor) {
        dispatch(addActive(humanWaitingOnThisFloor.id, humanWaitingOnThisFloor.from, humanWaitingOnThisFloor.to));
        dispatch(removeWaiting(humanWaitingOnThisFloor.id));
      }
      const humanActiveOnThisFloor = humansActiveRef.current.find(human => human.to === activeFloorRef.current);
      if (humanActiveOnThisFloor) {
        dispatch(removeActive(humanActiveOnThisFloor.id));
      }

      removeFromStopFloors();
    } else if (stopFloorsRef.current[0] > activeFloorRef.current) {
      console.log("UP");
      dispatch(up());
    } else {
      console.log("DOWN");
      dispatch(down());
    }
  }

  // elevator movingUp/movingDown and stopFloor state management
  useEffect(() => {
    console.log(`Moving ${movingUp ? 'UP' : movingUp === false ? 'DOWN' : 'NOT MOVING'}`);
    console.log('stopFloors', stopFloors);
    console.log('ups', ups);
    console.log('downs', downs);

    const isElevatorStopped = movingUp === undefined;
    if (isElevatorStopped) {
      if (ups.length > 0) {
        if (ups[0][0] >= activeFloor) {
          setMovingUp(true);
        } else {
          setMovingUp(false);
        }
      } else if (downs.length > 0) {
        if (downs[0][0] <= activeFloor) {
          setMovingUp(false);
        } else {
          setMovingUp(true);
        }
      }
    }

    attStopFloors();
    //eslint-disable-next-line
  }, [ups, downs, movingUp]);

  const attStopFloors = () => {
    let upRemovesIndex: number[] = [];
    let downRemovesIndex: number[] = [];
    if (movingUp) {
      // problema aqui
      if (ups.length > 0) {
        ups.forEach((up, index) => {
          if (up[0] < activeFloor) {
            return;
          }
          upRemovesIndex = [...upRemovesIndex, index];
          addToStopFloors(up, movingUp);
        });
        upRemovesIndex.forEach(upRemoveIndex => {
          dispatch(removeUp(ups[upRemoveIndex][0], ups[upRemoveIndex][1]));
        });
      } else {
        downs.forEach((down, index) => {
          if (down[0] < activeFloor) {
            return;
          }
          downRemovesIndex = [...downRemovesIndex, index];
          addToStopFloors(down, false);
        });
        downRemovesIndex.forEach(downRemoveIndex => {
          dispatch(removeDown(downs[downRemoveIndex][0], downs[downRemoveIndex][1]));
        });
      }
    } else if (movingUp === false) {
      // problema aqui
      if (downs.length > 0) {
        downs.forEach((down, index) => {
          if (down[0] > activeFloor) {
            return;
          }
          downRemovesIndex = [...downRemovesIndex, index];
          addToStopFloors(down, movingUp);
        });
        downRemovesIndex.forEach(downRemoveIndex => {
          dispatch(removeDown(downs[downRemoveIndex][0], downs[downRemoveIndex][1]));
        });
      } else {
        ups.forEach((up, index) => {
          if (up[0] < activeFloor) {
            return;
          }
          upRemovesIndex = [...upRemovesIndex, index];
          addToStopFloors(up, true);
        });
        upRemovesIndex.forEach(upRemoveIndex => {
          dispatch(removeDown(ups[upRemoveIndex][0], ups[upRemoveIndex][1]));
        });
      }
    }
  }

  const addToStopFloors = (stop: [number, number], up: boolean): void => {
    const unsortedStopFloors = [...stopFloors, stop[0], stop[1]];
    const sortedStopFloors = unsortedStopFloors.sort((a: number, b: number) => up ? (a - b) : (b - a));
    const noRepeatStopFloors = sortedStopFloors.filter((stopFloor, index) => sortedStopFloors.indexOf(stopFloor) === index);
    setStopFloors(noRepeatStopFloors);
  }

  const removeFromStopFloors = (): void => {
    const stopFloorsCopy = [...stopFloorsRef.current];
    stopFloorsCopy.splice(0, 1);
    setStopFloors(stopFloorsCopy);
  }

  const cables = [];
  for (let i = 0; i < height - activeFloor - 1; i++) {
    cables.push(<img src={CableImg} alt="Cable" key={i} className="elevator__item" />);
  }

  const humans = humansActive.map((humanActive, key) => {
    const shift = 50 + (key*20)%140 - Math.floor(key%8)*5;
    return <Human id={humanActive.id} big={false} key={key} className="elevator__human" left={`${shift}px`} />;
  })

  return (
    <div className="elevator">
      {cables}
      <div className="elevator__container">
        <img src={ElevatorImg} alt="Elevator" className="elevator__item" />
        {humans}
      </div>
    </div>
  );
}

export default Elevator;