import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  /* ---------------- UTILITIES ---------------- */

  const getUsers = () => {
    return JSON.parse(localStorage.getItem("vskill_users")) || [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("vskill_users", JSON.stringify(users));
  };

  const generateId = () => {
    return "user_" + Date.now();
  };

  /* ---------------- INIT (AUTO LOGIN) ---------------- */

  useEffect(() => {
    const savedUser = localStorage.getItem("vskill_current_user");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  /* ---------------- REGISTER ---------------- */

  const registerUser = (newUser) => {
    const users = getUsers();

    const userExists = users.find((u) => u.email === newUser.email);
    if (userExists) {
      return { success: false, message: "User already exists" };
    }

    const userData = {
      id: generateId(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      coins: 50, // default coins
      skills: [],
      certifications: [],
      createdAt: new Date().toISOString(),
    };

    users.push(userData);
    saveUsers(users);

    return { success: true };
  };

  /* ---------------- LOGIN ---------------- */

  const loginUser = (email, password) => {
    const users = getUsers();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setCurrentUser(user);
      user.lastActive = new Date().toISOString();
      localStorage.setItem("vskill_current_user", JSON.stringify(user));
      return user;
    }

    return null;
  };

  /* ---------------- LOGOUT ---------------- */

  const logoutUser = () => {
    localStorage.removeItem("vskill_current_user");
    setCurrentUser(null);
  };

  /* ---------------- GETTERS ---------------- */

  const getCurrentUser = () => {
    return currentUser;
  };

  const getAllUsers = () => {
    return getUsers();
  };

  /* ---------------- UPDATE USER ---------------- */

  const updateUser = (updatedUser) => {
  let users = getUsers();

  const updatedUsers = users.map((u) =>
    u.id === updatedUser.id
      ? {
          ...updatedUser,
          skills: updatedUser.skills || [], 
          certifications: updatedUser.certifications || [],
        }
      : u
  );

  saveUsers(updatedUsers);

  setCurrentUser(updatedUser);
  localStorage.setItem(
    "vskill_current_user",
    JSON.stringify(updatedUser)
  );
};

const getPostedSkills = () => {
  return JSON.parse(localStorage.getItem("vskill_posted_skills")) || [];
};

const getAllSkills = () => {
  const users = getUsers();

  let allSkills = [];

  users.forEach((user) => {
    if (user.skills && user.skills.length > 0) {
      const userSkills = user.skills.map((skill) => ({
        ...skill,
        userId: user.id,
        userName: user.name,
      }));

      allSkills = [...allSkills, ...userSkills];
    }
  });

  return allSkills;
};

  return (
    <AppContext.Provider
  value={{
    currentUser,
    registerUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUser,
    updateUser,
    getAllSkills, 
    getPostedSkills
  }}
  >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);