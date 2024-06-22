import { createContext, useContext, useState } from 'react';

const UsernameContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [user,setUser]=useState('')
  return (
    <UsernameContext.Provider value={{ username, setUsername,user,setUser }}>
      {children}
    </UsernameContext.Provider>
  );
};

export const useUsername = () => useContext(UsernameContext);