import { useContext } from 'react';
import { StoresContext } from '../context/StoresContext';

// Кастомный хук для доступа к MobX стору
const useStores = () => useContext(StoresContext);

export default useStores;
