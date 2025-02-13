import React from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../store';
import { ROLE } from '@/types/profile.types';
import { ROUTER } from '../constants/router';

const withRole = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: ROLE[]
) => {
  const RoleBasedComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const userLicense = useAppSelector((state) => state.auth.user?.license);

    const isAuthorized = userLicense && allowedRoles.includes(userLicense);

    if (!isAuthorized) {
      router.replace(ROUTER.LOGIN);
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return RoleBasedComponent;
};

export default withRole;
