import React from 'react';
import { TbBottle } from 'react-icons/tb';
import { IoMdPaper } from 'react-icons/io';
import { BsBoxSeam } from 'react-icons/bs';
import { PiPlant, PiDeviceMobileCameraThin } from 'react-icons/pi';
import { LiaDrumSteelpanSolid } from 'react-icons/lia';
import { LuTrash } from 'react-icons/lu';
import { AiOutlineQuestion } from 'react-icons/ai';
import { CiGlass } from 'react-icons/ci';

export default function Icons({ name, classname }) {
  return (
    <>
      {name === 'plastic' && <TbBottle className={classname} data-testid="plastic-icon" />}
      {name === 'paper' && <IoMdPaper className={classname} data-testid="paper-icon" />}
      {name === 'cardboard' && <BsBoxSeam className={classname} />}
      {name === 'compost' && <PiPlant className={classname} data-testid="compost-icon" />}
      {name === 'metal' && <LiaDrumSteelpanSolid className={classname} />}
      {name === 'glass' && <CiGlass className={classname} />}
      {(name === 'trash' || name === 'landfill') && <LuTrash className={classname} />}
      {name === 'other' && <PiDeviceMobileCameraThin className={classname} />}
      {name === 'unknown' && <AiOutlineQuestion className={classname} />}
    </>
  );
}
