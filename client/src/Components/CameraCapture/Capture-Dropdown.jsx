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
  { value: 'other', label: 'Other' },
  { value: 'unknown', label: 'Unknown' },
];

const reactSelectStyles = {
  // Table header text label
  singleValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#076B49',
    color: '#FFF',
  }),
  // Table header text border and background
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#076B49',
    border: 'none',
    width: '100%',
  }),
  // Dropdown menu
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor:
    state.isSelected
      ? '#076B49'
      : state.isFocused
        ? '#74CC67' : '#FFF',
    color: state.isSelected ? '#FFF' : '#000',
    '&:hover': {
      color: '#FFF',
    },
    ':active': {
      ...baseStyles[':active'],
      backgroundColor: '#0c9265',
    },
  }),
  // Down arrow
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: '#FFF',
    '@media only screen and (max-width: 767px)': {
      ...baseStyles['@media only screen and (max-width: 767px)'],
      width: '1.5rem',
    },
  }),
};

export default function Dropdown({ setCategory }) {
  const handleChange = (option) => {
    setCategory(option.value);
  };

  return (
    <Select
      options={options}
      defaultValue={options[0]}
      onChange={handleChange}
      isSearchable={false}
      styles={reactSelectStyles}
    />
  );
}
