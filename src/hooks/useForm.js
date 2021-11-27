import { useCallback, useState } from 'react';

export const useFormState = (initialState) => {
  const [content, setContent] = useState(initialState);

  const setValue = useCallback((key, value) => {
    setContent((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const onCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;

    setContent((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  }, []);

  return {
    content,
    setContent,
    setValue,
    onChange,
    onCheckboxChange,
  };
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'onChange': {
      const {
        target: { type, name, value, checked },
      } = action;

      return { ...state, [name]: type != 'checkbox' ? value : checked };
    }
    case 'setContent': {
      return { ...state, ...action.value };
    }
    default:
      console.log(action);
      return state;
  }
}
