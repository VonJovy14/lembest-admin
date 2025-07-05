import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateActiveNavigationAction } from "../middleware/action/Navigation";

const useUpdateActiveNavigation = (pageName) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateActiveNavigationAction(pageName));
  }, [dispatch, pageName]);
};

export default useUpdateActiveNavigation;
