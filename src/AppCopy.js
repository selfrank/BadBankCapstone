import UnauthorizedRoutes from "./Components/unauthorized";
import AuthorizedRoutes from "./Components/authorized";
import { useStoreState, useStoreActions } from "easy-peasy";
import firebaseService from "./Components/firebase";
import { useEffect, useState } from "react";

function App2() {
  const [loading, setLoading] = useState(true);
  const authorized = useStoreState((state) => state.authorized);
  const setAuthorized = useStoreActions((actions) => actions.setAuthorized);
  const setUnauthorized = useStoreActions((actions) => actions.setUnauthorized);

  const authStateListener = () => {
    firebaseService.auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        return setUnauthorized();
      }

      setLoading(false);
      return setAuthorized();
    });
  };

  useEffect(() => {
    authStateListener();
  }, [authStateListener]);

  return (
    <div className="App" style={{ padding: 16 }}>
      {loading ? (
        <p>Loading...</p>
      ) : authorized ? (
        <AuthorizedRoutes />
      ) : (
        <UnauthorizedRoutes />
      )}
    </div>
  );
}

export default App2;