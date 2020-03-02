import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { up, down, open, removeUp, removeDown } from '../../store/ducks/elevator';
import { removeWaiting } from '../../store/ducks/humans';
import { clearInterval } from 'timers';

import CableImg from '../../assets/cable.png';
import ElevatorImg from '../../assets/elevator.png';

import './Elevator.scss';

interface ElevatorProps {
  height: number;
}

const Elevator: React.FC<ElevatorProps> = props => {
  const { height } = props;

  const [movingUp, setMovingUp] = useState(false);
  const [movingDown, setMovingDown] = useState(false);
  const [stopFloors, setStopFloors] = useState<number[]>([]);

  const movingUpRef = useRef(movingUp);
  movingUpRef.current = movingUp;
  const movingDownRef = useRef(movingDown);
  movingDownRef.current = movingDown;
  const stopFloorsRef = useRef(stopFloors);
  stopFloorsRef.current = stopFloors;

  const floor = useSelector((state: RootState) => state.elevator.floor);
  const ups = useSelector((state: RootState) => state.elevator.ups);
  const downs = useSelector((state: RootState) => state.elevator.downs);

  const floorRef = useRef(floor);
  floorRef.current = floor;
  const upsRef = useRef(ups);
  upsRef.current = ups;
  const downsRef = useRef(downs);
  downsRef.current = downs;

  const humansWaiting = useSelector((state: RootState) => state.humans.waiting);

  const humansWaitingRef = useRef(humansWaiting);
  humansWaitingRef.current = humansWaiting;

  const dispatch = useDispatch();

  useEffect(() => {
    const elevator = setInterval(() => {
      //console.clear();
      //elevatorUp();
      //elevatorDown();
      console.log("Elevator working...");
      console.log("Floor:", floorRef.current);
      console.log("stopFloors:", stopFloorsRef.current);
      console.log("ups", upsRef.current);
      console.log("downs", downsRef.current);
      console.log("Moving UP:", movingUpRef.current);
      console.log("Moving DOWN:", movingDownRef.current);
      console.log("========================");
    }, 5000);
    return () => clearInterval(elevator);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const isElevatorStopped = (!movingDown && !movingUp);
    const isAnyUpOrDown = (ups.length > 0 || downs.length > 0);
    if (isElevatorStopped && isAnyUpOrDown) {
      let selectedFloor: number;
      if (ups[0] !== undefined) {
        /*
        if (ups[0] === floorRef.current) {
          dispatch(removeUp(ups[0]));
        }
        */
        selectedFloor = ups[0][0];
      } else {
        /*
        if (downs[0] === floorRef.current) {
          dispatch(removeDown(downs[0]));
        }
        */
        selectedFloor = downs[0][0];
      }
      console.log("SELECTED FLOOR:", selectedFloor);
      setMovingUp(selectedFloor > floor);
      setMovingDown(selectedFloor < floor);
    }
    // eslint-disable-next-line
  }, [ups, downs, movingUp, movingDown]);

  useEffect(() => {
    const addedCall = movingUp ? ups[ups.length-1] : downs[downs.length-1];

    if (!addedCall) {
      return;
    }

    if (movingUp ? (addedCall[0] >= floor) : (addedCall[0] <= floor)) {
      console.log("CHEGUEI AQUI");
      setStopFloors([...stopFloors, addedCall[0], addedCall[1]]);
      const sortedStopFloors = stopFloors.sort((a: number, b: number) => movingUp ? (a - b) : (b - a));
      setStopFloors(sortedStopFloors);
    } else {
      console.log("DISGRAÇA");
    }
    // eslint-disable-next-line
  }, [ups, downs]);

  const elevatorUp = () => {
    // erro aqui
    if (stopFloorsRef.current.length === 0) {
      setMovingUp(false);
    }
    if (!movingUpRef.current) {
      return;
    }
    
    // erro aqui
    //const stopFloors = getStopFloors(floorRef.current, upsRef.current, movingUpRef.current);
    if (stopFloors.find(stopFloor => stopFloor === floorRef.current)) {
      dispatch(open());
      const humanWaitingOnThisFloor = humansWaitingRef.current.find(humanWaiting => humanWaiting.floor === floorRef.current);
      if (humanWaitingOnThisFloor) {
        dispatch(removeWaiting(humanWaitingOnThisFloor.id));
      }
      // erro aqui
      dispatch(removeUp(floorRef.current));
    } else {
      dispatch(up());
    }
  }

  const elevatorDown = () => {
    // erro aqui
    if (downsRef.current.length === 0) {
      setMovingDown(false);
    }
    if (!movingDownRef.current) {
      return;
    }

    // erro aqui
    //const stopFloors = getStopFloors(floorRef.current, downsRef.current, movingDownRef.current);
    if (stopFloors.find(stopFloor => stopFloor === floorRef.current)) {
      dispatch(open());
      const humanWaitingOnThisFloor = humansWaitingRef.current.find(humanWaiting => humanWaiting.floor === floorRef.current);
      if (humanWaitingOnThisFloor) {
        dispatch(removeWaiting(humanWaitingOnThisFloor.id));
      }
      // erro aqui
      dispatch(removeDown(floorRef.current));
    } else {
      dispatch(down());
    }
  }

  /*
  const getStopFloors = (actualFloor: number, allStopFloors: [number, number][], goingUp: boolean) => {
    let linearAllStopFloors: number[] = [];
    allStopFloors.forEach(floors => linearAllStopFloors = [...linearAllStopFloors, floors[0], floors[1]]);

    const sortedStopFloors = linearAllStopFloors.sort((a: number, b: number) => goingUp ? (a - b) : (b - a));
    const stopFloors = sortedStopFloors.filter(stopFloor => goingUp ? (stopFloor >= actualFloor) : (stopFloor <= actualFloor));
    return stopFloors;
  };
  */

  const cables = [];

  for (let i = 0; i < height - floor - 1; i++) {
    cables.push(<img src={CableImg} alt="Cable" key={i} className="elevator__item" />);
  }

  return (
    <div className="elevator">
      {cables}
      <img src={ElevatorImg} alt="Elevator" className="elevator__item" />
    </div>
  );
}

export default Elevator;