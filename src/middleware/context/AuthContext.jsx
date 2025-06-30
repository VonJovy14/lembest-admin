import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { useDispatch } from "react-redux";

// 🧠 Redux actions (adjust path if needed)
import { fetchUserData, clearUserData } from "../reducers/Users";

import Loading from "../../page/Loading";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            dispatch(fetchUserData({ id: user.uid, ...userSnap.data() }));
          }
        } catch (err) {
          console.error("🔥 Firestore fetch error:", err);
        }
      } else {
        setCurrentUser(null);
        dispatch(clearUserData());
      }

      setLoading(false);
    });

    return () => unsub();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
