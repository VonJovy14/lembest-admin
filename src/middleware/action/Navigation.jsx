import { updateActiveNavigation } from "../reducers/Navigation";

export const updateActiveNavigationAction =
  (activeNavigation) => (dispatch) => {
    dispatch(updateActiveNavigation(activeNavigation));
  };
