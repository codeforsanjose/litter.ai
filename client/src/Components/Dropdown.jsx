import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const captureOptions = [
  { value: 'paper', label: 'Paper' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'compost', label: 'Compost' },
  { value: 'metal', label: 'Metal' },
  { value: 'cardboard', label: 'Cardboard' },
  { value: 'trash', label: 'Trash' },
  { value: 'glass', label: 'Glass' },
  { value: 'other', label: 'Other' },
  { value: 'unknown', label: 'Unknown' },
];

const lbOptions = [
  { value: 'total', label: 'Total' },
  { value: 'paper', label: 'Paper' },
  { value: 'plastic', label: 'Plastic' },
  { value: 'compost', label: 'Compost' },
  { value: 'metal', label: 'Metal' },
  { value: 'cardboard', label: 'Cardboard' },
  { value: 'trash', label: 'Trash' },
  { value: 'glass', label: 'Glass' },
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

export default function Dropdown({
  setLBCategory,
  setImageCategory,
  imageCategory,
}) {
  const [defaultValue, setDefaultValue] = useState(null);
  const [options, setOptions] = useState(lbOptions);

  const handleChange = (option) => {
    if (imageCategory) {
      setImageCategory(option.value);
    } else {
      setLBCategory(option.value);
    }
  };

  useEffect(() => {
    const index = captureOptions.map((item) => item.value).indexOf(imageCategory);
    if (index > -1) {
      setOptions(captureOptions);
      setDefaultValue(captureOptions[index]);
    } else {
      setOptions(lbOptions);
      setDefaultValue(lbOptions[0]);
    }
  }, [imageCategory]);

  return (
    <div>
      { defaultValue
        && (
          <Select
            options={options}
            defaultValue={defaultValue}
            onChange={handleChange}
            isSearchable={false}
            styles={reactSelectStyles}
          />
        )}
    </div>
  );
}
