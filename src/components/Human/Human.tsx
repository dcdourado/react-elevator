import React from 'react';

// Pixel Art by Andy Rash
import Human0 from '../../assets/human/0.png'
import Human1 from '../../assets/human/1.png'
import Human2 from '../../assets/human/2.png'
import Human3 from '../../assets/human/3.png'
import Human4 from '../../assets/human/4.png'
import Human5 from '../../assets/human/5.png'
import Human6 from '../../assets/human/6.png'
import Human7 from '../../assets/human/7.png'
import Human8 from '../../assets/human/8.png'
import Human9 from '../../assets/human/9.png'
import Human10 from '../../assets/human/10.png'
import Human11 from '../../assets/human/11.png'
import Human12 from '../../assets/human/12.png'
import Human13 from '../../assets/human/13.png'
import Human14 from '../../assets/human/14.png'
import Human15 from '../../assets/human/15.png'

import './Human.scss';

const humans = [
  Human0,
  Human1,
  Human2,
  Human3,
  Human4,
  Human5,
  Human6,
  Human7,
  Human8,
  Human9,
  Human10,
  Human11,
  Human12,
  Human13,
  Human14,
  Human15,
];

interface HumanProps {
  id: number;
}

const Human: React.FC<HumanProps> = props => {
  const { id } = props;

  return <img src={humans[id]} alt='Human' className='human' />;
}

export default Human;
