import { makeAutoObservable } from 'mobx';

class UserStore {
  user = null;
  error = null;

  constructor() {
    makeAutoObservable(this);

    // Загружаем пользователя из localStorage при инициализации
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  }

  // Список пользователей с логинами и паролями
  users = [
    { username: 'admin', password: 'admin' },
    { username: 'user', password: 'user' },
  ];

  // Функция входа
  login(username, password) {
    const foundUser = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      this.user = { username: foundUser.username };
      this.error = null; // Сбрасываем ошибку
      localStorage.setItem('user', JSON.stringify(this.user)); // Сохраняем пользователя
    } else {
      this.error = 'Неверное имя пользователя или пароль';
    }
  }

  // Функция выхода
  logout() {
    this.user = null;
    this.error = null; // Сбрасываем ошибку
    localStorage.removeItem('user'); // Удаляем пользователя из localStorage
  }
}

const userStore = new UserStore();
export default userStore;
