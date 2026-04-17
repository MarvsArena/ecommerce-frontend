import { createContext, useCallback, useContext, useMemo, useState } from "react";

import {
  getProfileRequest,
  loginRequest,
  registerRequest,
  updateProfileRequest,
} from "../services/authService";

const AuthContext = createContext(null);
const storageKey = "omd-hairville-user";

const readStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(storageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem(storageKey);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const persistUser = useCallback((authUser) => {
    localStorage.setItem(storageKey, JSON.stringify(authUser));
    setUser(authUser);
    return authUser;
  }, []);

  const login = useCallback(async (payload) => persistUser(await loginRequest(payload)), [persistUser]);
  const register = useCallback(async (payload) => persistUser(await registerRequest(payload)), [persistUser]);
  const refreshProfile = useCallback(async () => persistUser(await getProfileRequest()), [persistUser]);
  const updateProfile = useCallback(
    async (payload) => persistUser(await updateProfileRequest(payload)),
    [persistUser],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(storageKey);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === "admin",
      login,
      register,
      refreshProfile,
      updateProfile,
      logout,
    }),
    [login, logout, refreshProfile, register, updateProfile, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
