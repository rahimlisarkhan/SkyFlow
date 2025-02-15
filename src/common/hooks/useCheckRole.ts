import { ROLE } from '../constants/role';
import { useAppSelector } from '../store';
import { selUser } from '../store/slices/authSlice';

const useCheckRole = (globalRoles?: ROLE[]) => {
  const user = useAppSelector(selUser);
  const userLicense = user?.license;

  return <T>(item: T, parRoles?: ROLE[]): T | null => {
    return userLicense && (globalRoles ?? parRoles)?.includes(userLicense)
      ? item
      : null;
  };
};

export default useCheckRole;
