import { ROLE } from '../constants/role';
import { useAppSelector } from '../store';

const useCheckRole = (globalRoles?: ROLE[]) => {
  const userLicense = useAppSelector((state) => state.auth.user?.license);

  return <T>(item: T, parRoles?: ROLE[]): T | null => {
    return userLicense && (globalRoles ?? parRoles)?.includes(userLicense)
      ? item
      : null;
  };
};

export default useCheckRole;
