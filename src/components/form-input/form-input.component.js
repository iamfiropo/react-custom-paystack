import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ label, cardNum, card, handleChange, ...otherProps }) => (
  <div className='group'>
    {label ? (<label className={`${ otherProps.value.length ? 'shrink' : '' } form-input-label`}>
      {label}
    </label>) : null}
    <input 
      className={`${ cardNum ? 'cardNum' : '' } ${card ? 'card' : ''} form-input`}
      onChange={handleChange}
      { ...otherProps }
    />
  </div>
);

export default FormInput;