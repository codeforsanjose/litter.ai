import React from 'react';
import Select from 'react-select';


// Total's value is a blank string because it is a different endpoint on API
const options = [
  { value: '', label: 'Total' },
  { value: 'paper', label: 'Paper' },
  { value: 'metal', label: 'Metal' },
  { value: 'cardboard', label: 'Cardboard' },
  { value: 'trash', label: 'Trash' },
  { value: 'glass', label: 'Glass' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'compost', label: 'Compost' },
  { value: 'others', label: 'Others' },
  { value: 'unknown', label: 'Unknown' },
]

export default function Dropdown({ setCategory }) {
  const handleChange = (option) => {
    setCategory(option.value);
  }

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={handleChange}
      />
  )
}