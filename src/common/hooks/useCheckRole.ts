import { ROLE } from "../constants/role";
import { useAppSelector } from "../store";

const useCheckRole = (allowedRoles: ROLE[]) => {
  const userLicense = useAppSelector((state) => state.auth.user?.license);

  return <T>(item: T): T | null => {
    return userLicense && allowedRoles.includes(userLicense) ? item : null;
  };
};

export default useCheckRole;
