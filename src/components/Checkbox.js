import Component from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

export default function Checkbox({ name, setState, ...rest }) {
  const onChange = useCallback(
    setState
      ? ({ target: { checked } }) => {
          setState((prevState) => ({
            ...prevState,
            [name]: checked,
          }));
        }
      : null,
    [],
  );

  return <Component name={name} size="small" onChange={onChange} {...rest} />;
}
Checkbox.propTypes = {
  name: PropTypes.string,
  setState: PropTypes.func,
};
