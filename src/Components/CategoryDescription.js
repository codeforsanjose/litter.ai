import React, { useState } from 'react';

export default function CategoryDescription ({ type }) {
  const [category] = useState(type);

  return (
    <div>
      <h4>Hooray!!!!</h4>
      <h4>You made it</h4>
      <img src={category.icon} alt="recycle icon" />
      <div>{category.description}</div>
    </div>
  );
};
