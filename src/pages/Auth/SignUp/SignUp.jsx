import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    surname: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {}
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Succes registration");
      navigate('/confirm');
    }
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-black/20">
      {/* Увеличиваем ширину section до max-w-2xl */}
      <section className="flex flex-col justify-center items-center w-full max-w-2xl p-2 bg-white rounded-[50px] shadow-2xl overflow-y-auto">
        <header className="flex items-center justify-center w-full h-[54px]">
          <img className="w-10 h-10" src="/assets/exercise.png" alt="Exercise Icon" />
          <h1 className="text-3xl font-normal text-center text-black font-roboto ml-2">
            FitnessRemote
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="w-full">
          {['Фамилия', 'Имя', 'Электронная почта', 'Пароль', 'Подтверждение пароля'].map((label, index) => (
            <div key={index} className="w-full flex flex-col mt-3">
              {/* Центрируем label */}
              <label htmlFor={label} className="text-lg text-black font-roboto text-center">
                {label}
              </label>
              <input
                type={label.includes('Пароль') ? 'password' : label.includes('почта') ? 'email' : 'text'}
                id={label.toLowerCase()}
                className="w-96 p-6 text-base rounded-[50px] border-none bg-white shadow-md mx-auto"
                placeholder={
                  label === 'Фамилия' ? 'Иванов' 
                  : label === 'Имя' ? 'Иван' 
                  : label === 'Электронная почта' ? 'trainer@yandex.ru' 
                  : label === 'Пароль' ? '*********' 
                  : label === 'Подтверждение пароля' ? '*********' : ''
                }
              />
              {errors[index] && <p>{errors[index]}</p>}
            </div>
          ))}
          <button
            onClick={() => navigate('/confirm')}
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
};

export default SignUp;