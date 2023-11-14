import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'total', label: 'Total' },
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
      styles={
        {singleValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: '#076B49',
          color: 'white',
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: '#076B49',
          border: 'none',
        })
        }
      }
    />
  )
}