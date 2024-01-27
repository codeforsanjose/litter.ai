import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export default function Loading({ loading }) {
  const loadingStyles = {
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  };

  return (
    <TailSpin
      visible={loading}
      height="80"
      width="80"
      color="#076B49"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={loadingStyles}
      wrapperClass="main-container"
    />
  );
}
