import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store';
import { ROUTER } from '../constants/router';
import Loading from '../components/Loading';
import { ROLE } from '../constants/role';
import { initProfile } from '../store/slices/authSlice';
import { useDebounce } from '../hooks/useDebounce';
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
    const [loading, setLoading] = useState(true); // For clear route view

    const router = useRouter();
    const debounce = useDebounce();
    const dispatch = useAppDispatch();

    useEffect(() => {
      const token = localStorage.getItem(LOCAL_STORE.ACCESS_TOKEN);

      if (!user && token) {
        setLoading(true);
        dispatch(initProfile());
        return;
      }

      debounce(() => {
        setLoading(false);
      });

      if (checkType === CheckType.AUTH && !user) {
        router.push(ROUTER.LOGIN);
        return;
      }

      if (checkType === CheckType.USER && user) {
        router.push(ROUTER.DASHBOARD);
        return;
      }

      if (checkType === CheckType.USER && allowedRoles && user) {
        const isAuthorized = allowedRoles.includes(user.license);
        if (!isAuthorized) {
          router.push(ROUTER.LOGIN);
        }
      }
    }, [user, checkType, allowedRoles, router]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withRoleGuard;
