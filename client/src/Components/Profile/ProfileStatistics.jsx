import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { TbBottle } from 'react-icons/tb';
import { IoMdPaper } from 'react-icons/io';
import { BsBoxSeam } from 'react-icons/bs';
import { PiPlant, PiDeviceMobileCameraThin } from 'react-icons/pi';
import { LiaDrumSteelpanSolid } from 'react-icons/lia';
import { LuTrash } from 'react-icons/lu';
import { AiOutlineQuestion } from 'react-icons/ai';
import { CiGlass } from 'react-icons/ci';
import { capitalizeList } from '../../utils/capitalizeFirstLetter';

export default function ProfileStatistics({ user }) {
  const [userStatistics, setUserStatistics] = useState([]);

  const handleUserData = (category) => (
    <div key={uuid()}>
      <div className="profile-stats-row">
        <div className="profile-stats-left">
          <div className="profile-stats-icon-bg">
            {category[0] === 'Plastic' && <TbBottle className="profile-stats-icon" />}
            {category[0] === 'Paper' && <IoMdPaper className="profile-stats-icon" />}
            {category[0] === 'Cardboard' && <BsBoxSeam className="profile-stats-icon" />}
            {category[0] === 'Compost' && <PiPlant className="profile-stats-icon" />}
            {category[0] === 'Metal' && <LiaDrumSteelpanSolid className="profile-stats-icon" />}
            {category[0] === 'Glass' && <CiGlass className="profile-stats-icon" />}
            {category[0] === 'Trash' && <LuTrash className="profile-stats-icon" />}
            {category[0] === 'Other' && <PiDeviceMobileCameraThin className="profile-stats-icon" />}
            {category[0] === 'Unknown' && <AiOutlineQuestion className="profile-stats-icon" />}
          </div>
          <h4>{category[0]}</h4>
        </div>
        <p className="profile-stats-number">{category[1]}</p>
      </div>
      <hr />
    </div>
  );

  // Capitalizes the first letter and sorts the list in descending order
  useEffect(() => {
    const list = capitalizeList(user);
    list.sort((a, b) => b[1] - a[1]);
    setUserStatistics(list);
  }, [user]);

  return (
    <>
      { userStatistics.map((category) => handleUserData(category)) }
    </>
  );
}
