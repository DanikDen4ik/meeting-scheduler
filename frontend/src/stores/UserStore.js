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

  login(username, password) {
    // Проверка логина и пароля
    if (username === 'admin' && password === 'admin') {
      this.user = { username };
      this.error = null; // Сбрасываем ошибку
      localStorage.setItem('user', JSON.stringify(this.user)); // Сохраняем пользователя
    } else {
      this.error = 'Неверное имя пользователя или пароль';
    }
  }

  logout() {
    this.user = null;
    this.error = null; // Сбрасываем ошибку
    localStorage.removeItem('user'); // Удаляем пользователя из localStorage
  }
}

const userStore = new UserStore();
export default userStore;
