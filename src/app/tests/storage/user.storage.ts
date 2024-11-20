import { getId } from '../utils';
import { Usuario } from './../../service/user/user';
import { MockStorage } from './mock.storage';

export class UserMockStorage extends MockStorage {
  constructor() {
    super();
    if (!this.getItem("user")) {
      this.setItem("user", JSON.stringify([]));
    }
  }

  save(user: Usuario) {
    const users = this.getUsers();
    user.id = this.getUserNextId();
    users.push(user);
    this.setUsers(users);
  }

  remove(userId: number) {
    const users = this.getUsers().filter((u) => u.id !== userId);
    this.setUsers(users);
  }

  edit(user: Usuario) {
    const users = this.getUsers().map((u) => (u.id == user.id ? user : u));
    this.setUsers(users);
  }

  find(userId: number): Usuario | undefined {
    return this.getUsers().find((u) => u.id == userId);
  }

  getUsers(): Usuario[] {
    return JSON.parse(this.getItem("user") || "[]");
  }

  getUserNextId(): number {
    return getId('userId');
  }
  setUserId(value: number): void {
    this.setItem('userId', value);
  }
  private setUsers(users: Usuario[]) {
    this.setItem("user", JSON.stringify(users));
  }
}
