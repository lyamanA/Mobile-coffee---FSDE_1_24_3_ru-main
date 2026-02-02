import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

type AuthState = {
  user: User | null;
  users: User[];

  loadUsers: () => Promise<void>;
  register: (user: User) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  users: [],

  loadUsers: async () => {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    const currentUser = await AsyncStorage.getItem(CURRENT_USER_KEY);

    set({
      users: storedUsers ? JSON.parse(storedUsers) : [],
      user: currentUser ? JSON.parse(currentUser) : null,
    });
  },

  register: async (user) => {
    const stored = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = stored ? JSON.parse(stored) : [];

    const exists = users.find(u => u.email === user.email);
    if (exists) return false;

    users.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

    set({ users });
    return true;
  },

  login: async (email, password) => {
    const users = get().users;

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) return false;

    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    set({ user });

    return true;
  },

  logout: async () => {
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
    set({ user: null });
  },
}));
