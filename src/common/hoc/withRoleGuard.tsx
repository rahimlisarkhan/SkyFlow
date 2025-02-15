import React, { ComponentType, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store';
import { ROUTER } from '../constants/router';
import Loading from '../components/Loading';
import { ROLE } from '../constants/role';
import { initProfile } from '../store/slices/authSlice';
import { LOCAL_STORE } from '../constants/keys';
import { useDebounce } from '../hooks/useDebounce';

const withRoleGuard = <P extends object>(
  WrappedComponent: ComponentType<P>,
  allowedRoles?: ROLE[]
) => {
  const AuthHOC = (props: P) => {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);

    const debounce = useDebounce(250);

    function handleUserRedirect() {
      if (!user) return;
      const isAuthorized = allowedRoles?.includes(user.license); // both checking role and also, has user?

      if (!isAuthorized) {
        router.replace(ROUTER.DASHBOARD);
      }

      debounce(() => {
        setLoading(false);
      });
    }

    function handleLoginRedirect() {
      router.replace(ROUTER.LOGIN);
      debounce(() => {
        setLoading(false);
      });
    }

    useEffect(() => {
      const token = localStorage.getItem(LOCAL_STORE.ACCESS_TOKEN);

      if (user) {
        handleUserRedirect();
        return;
      }

      if (!token) {
        handleLoginRedirect();
        return;
      }

      async function init() {
        const result = await dispatch(initProfile());
        if (initProfile.fulfilled.match(result)) {
          handleUserRedirect();
        } else {
          handleLoginRedirect();
        }
      }

      init();
    }, [user]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withRoleGuard;
