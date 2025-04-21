import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../http/UserContext/UserContext';
import { observer } from 'mobx-react-lite';

const SignUp = observer(() => {
  const navigate = useNavigate();
  const { register } = useUser();
  
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.surname.match(/^[А-Яа-яA-Za-z]+$/)) {
      newErrors.surname = 'Фамилия должна содержать только буквы';
    }
    if (!formData.name.match(/^[А-Яа-яA-Za-z]+$/)) {
      newErrors.name = 'Имя должно содержать только буквы';
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Введите корректный email';
    }
    if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (validate()) {
      const payload = {
        name: `${formData.surname} ${formData.name}`,
        email: formData.email,
        password: formData.password
      };

      const result = await register(payload);
      console.log("Успешная регистрация", result);
      navigate('/main');
      // if (result && (result.success || result.value)) {
      //   console.log("Успешная регистрация", result);
      //   navigate('/confirm');
      // } else {
      //   setServerError(result.message || 'Ошибка регистрации');
      //   console.log("Ошибка регистрации", result);
      // }
    }
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-black/20">
      <section className="flex flex-col justify-center items-center w-full max-w-2xl p-2 bg-white rounded-[50px] shadow-2xl overflow-y-auto">
        <header className="flex items-center justify-center w-full h-[54px]">
          <img className="w-10 h-10" src="/assets/exercise.png" alt="Exercise Icon" />
          <h1 className="text-3xl font-normal text-center text-black font-roboto ml-2">
            BigCam
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Фамилия */}
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="surname" className="text-lg text-black font-roboto text-center">
              Фамилия
            </label>
            <input
              type="text"
              id="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Иванов"
              className="w-96 p-6 text-base rounded-[50px] border-none bg-white shadow-md mx-auto"
            />
            {errors.surname && <p className="text-red-500 text-center mt-1">{errors.surname}</p>}
          </div>

          {/* Имя */}
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="name" className="text-lg text-black font-roboto text-center">
              Имя
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Иван"
              className="w-96 p-6 text-base rounded-[50px] border-none bg-white shadow-md mx-auto"
            />
            {errors.name && <p className="text-red-500 text-center mt-1">{errors.name}</p>}
          </div>

          {/* Электронная почта */}
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="email" className="text-lg text-black font-roboto text-center">
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="trainer@yandex.ru"
              className="w-96 p-6 text-base rounded-[50px] border-none bg-white shadow-md mx-auto"
            />
            {errors.email && <p className="text-red-500 text-center mt-1">{errors.email}</p>}
          </div>

          {/* Пароль */}
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="password" className="text-lg text-black font-roboto text-center">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="*********"
              className="w-96 p-6 text-base rounded-[50px] border-none bg-white shadow-md mx-auto"
            />
            {errors.password && <p className="text-red-500 text-center mt-1">{errors.password}</p>}
          </div>

          {/* Подтверждение пароля */}
          <div className="w-full flex flex-col mt-3">
            <label htmlFor="confirmPassword" className="text-lg text-black font-roboto text-center">
              Подтверждение пароля
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="*********"
              className="w-96 p-6 text-base rounded-[50px] border-none bg-white shadow-md mx-auto"
            />
            {errors.confirmPassword && <p className="text-red-500 text-center mt-1">{errors.confirmPassword}</p>}
          </div>

          {serverError && <p className="text-red-500 text-center mt-2">{serverError}</p>}

          <button
            type="submit"
            className="w-96 h-14 mt-8 mb-5 mx-auto flex justify-center items-center hover:bg-[#d95353] transition-colors bg-[#ea5f5f] rounded-[500px] shadow-md text-black text-lg font-roboto"
          >
            Зарегистрироваться
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-black text-base font-roboto underline"
        >
          Уже есть аккаунт? Войти
        </button>
      </section>
    </main>
  );
});

export default SignUp;
