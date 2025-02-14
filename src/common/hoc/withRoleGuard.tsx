import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store';
import { ROUTER } from '../constants/router';
import Loading from '../components/Loading';
import { ROLE } from '../constants/role';
import { initProfile } from '../store/slices/authSlice';
import { LOCAL_STORE } from '../constants/keys';

export enum CheckType {
  AUTH = 'AUTH',
  USER = 'USER',
}

const withRoleGuard = <P extends object>(
  WrappedComponent: ComponentType<P>,
  checkType: CheckType = CheckType.AUTH,
  allowedRoles?: ROLE[]
) => {
  const AuthHOC = (props: P) => {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem(LOCAL_STORE.ACCESS_TOKEN);

      if (!user && token) {
        dispatch(initProfile());
        setLoading(true);
        return;
      }

      setLoading(false);

      if (checkType === CheckType.AUTH && !user) {
        router.replace(ROUTER.LOGIN);
        return;
      }

      if (checkType === CheckType.USER && user) {
        router.replace(ROUTER.DASHBOARD);
        return;
      }

      if (checkType === CheckType.USER && allowedRoles && user) {
        const isAuthorized = allowedRoles.includes(user.license);
        if (!isAuthorized) {
          router.replace(ROUTER.LOGIN);
        }
      }
    }, [user]);

    return (
      <>
        {loading && <Loading />}
        <WrappedComponent {...props} />
      </>
    );
  };

  return AuthHOC;
};

export default withRoleGuard;
