import Component from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

export default function Checkbox({ name, setState, onChange, ...rest }) {
  const valueSetter = useCallback((e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.checked,
    }));

    onChange(e);
  }, []);

  return (
    <Component name={name} size="small" onChange={valueSetter} {...rest} />
  );
}
Checkbox.defaultProps = {
  onChange: () => null,
  setState: () => null,
};
Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  setState: PropTypes.func,
  onChange: PropTypes.func,
};
