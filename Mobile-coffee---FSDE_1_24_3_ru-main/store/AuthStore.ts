import { makeAutoObservable } from "mobx";

type User = {
  email: string;
  password: string;
};

class AuthStore {
  users: User[] = [];
  currentUser: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  register(user: User) {
    this.users.push(user);
  }

  login(email: string, password: string) {
    const user = this.users.find(
      u => u.email === email && u.password === password
    );
    if (user) this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
  }
}

export const authStore = new AuthStore();
