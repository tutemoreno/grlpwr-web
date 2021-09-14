import Component from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

export default function TextField({ name, setState, onChange, ...rest }) {
  const valueSetter = useCallback((e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));

    onChange(e);
  }, []);

  return (
    <Component
      name={name}
      variant="outlined"
      fullWidth
      size="small"
      onChange={valueSetter}
      {...rest}
    />
  );
}
TextField.defaultProps = {
  onChange: () => null,
  setState: () => null,
};
TextField.propTypes = {
  name: PropTypes.string.isRequired,
  setState: PropTypes.func,
  onChange: PropTypes.func,
};
