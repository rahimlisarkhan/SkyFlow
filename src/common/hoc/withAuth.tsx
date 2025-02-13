import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { RootState, useAppSelector } from '../store';
import { ROUTER } from '../constants/router';
import { useDebounce } from '../hooks/useDebounce';
import Loading from '../components/Loading';

export enum CheckType {
  AUTH = 'AUTH',
  USER = 'USER',
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  checkType: CheckType = CheckType.AUTH
) => {
  const AuthHOC = (props: P) => {
    const router = useRouter();

    const debounce = useDebounce(150);
    // const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);

    const user = true;

    useEffect(() => {
      if (checkType === CheckType.AUTH && !user) {
        router.push(ROUTER.LOGIN);
      }

      if (checkType === CheckType.USER && user) {
        router.push(ROUTER.DASHBOARD);
      }

      debounce(() => {
        setLoading(false);
      });
    }, [user, router, checkType]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
