import React, { createContext } from 'react';
import userStore from '../stores/UserStore';
import scheduleStore from '../stores/ScheduleStore';

export const StoresContext = createContext({
  userStore,
  scheduleStore,
});

export const StoresProvider = ({ children }) => (
  <StoresContext.Provider value={{ userStore, scheduleStore }}>
    {children}
  </StoresContext.Provider>
);
