import React from 'react'
import './Register.css'

export default function Register({ toggleComponent }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Создание объекта пользователя для отправки на сервер
    const userData = {
      username,
      password,
      email
    };

    try {
      // Отправка данных на сервер для регистрации пользователя
      const response = await fetch('http://your-backend-url/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      // Обработка ответа от сервера
      if (response.ok) {
        // Пользователь успешно зарегистрирован, выполните необходимые действия, например, перенаправление на страницу входа
      } else {
        // Обработка ошибки регистрации, например, вывод сообщения об ошибке
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='register'>
        <div className='block'>
          <span>регистрация</span>
          <input
            type='text'
            placeholder='логин'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='пароль'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button onClick={toggleComponent}>зарегистрироваться</button>
        </div>
      </div>
    </form>
  )
}
