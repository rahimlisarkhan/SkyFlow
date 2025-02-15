import { LOCAL_STORE } from "@/common/constants/keys";
import { useAppDispatch, useAppSelector } from "@/common/store";
import { initProfile, selUser } from "@/common/store/slices/authSlice";
import { useEffect } from "react";

export const useInit = () => {
  const user = useAppSelector(selUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) return;
    const token = localStorage.getItem(LOCAL_STORE.ACCESS_TOKEN);
    token && dispatch(initProfile());
  }, [user]);
};
