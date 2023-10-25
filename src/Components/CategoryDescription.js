import React, { useState } from 'react';
import { categoryData } from '../DummyData/sampleCategoryData.js'

export default function CategoryDescription ({type}) {
  const [category] = useState(categoryData.recycle);
console.log(category.img);
  return (
    <div>
      <h4>Hooray!!!!</h4>
      <h4>You made it</h4>
      <img>placeholder</img>
      {/* <h1>{category.category}</h1> */}
    </div>
  );
};
