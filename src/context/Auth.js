import axios from 'axios';
import PropTypes from 'prop-types';
import qs from 'qs';
import React, { createContext, useContext, useState } from 'react';
import { getStore, removeStore, setStore } from '../utils/store';

const {
    REACT_APP_NEXTLAB_TOKEN,
    REACT_APP_STORE_PATH,
    REACT_APP_USER_SERVICE,
  } = process.env,
  AuthContext = createContext();

export function AuthProvider({ children }) {
  const store = getStore(REACT_APP_STORE_PATH);
  const [user, setUser] = useState(store ? store : null);

  const signIn = async (content) => {
    const { username, password, remember } = content;
    let isValid = false;

    const { data } = await axios({
      method: 'post',
      url: `${REACT_APP_USER_SERVICE}/usuario_valido`,
      data: qs.stringify({
        tipo: 'OR',
        aplicacion: 'WEB',
        usuario: username,
        clave: password,
        token: REACT_APP_NEXTLAB_TOKEN,
      }),
    });

    isValid = data.Usuario.EsValido == 'true';
    const codigo = data.Usuario.Codigo;

    if (isValid) {
      const usr = { username, isValid, codigo };

      setUser(usr);
      setStore(REACT_APP_STORE_PATH, usr, remember, codigo);
    }

    return isValid;
  };

  const signOut = () => {
    removeStore(REACT_APP_STORE_PATH);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
