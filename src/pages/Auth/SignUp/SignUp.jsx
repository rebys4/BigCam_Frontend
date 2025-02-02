import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Регистрация прошла успешно');
    navigate('/confirm');
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-black/20">
      {/* Увеличиваем ширину section до max-w-2xl */}
      <section className="flex flex-col justify-center items-center w-full max-w-2xl p-2 bg-white rounded-[50px] shadow-2xl overflow-y-auto">
        <header className="flex items-center justify-center w-full h-[54px]">
          <img className="w-10 h-10" src="/assets/exercise.png" alt="Exercise Icon" />
          <h1 className="text-3xl font-normal text-center text-black font-roboto ml-2">
            FitnessMonitor
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
            </div>
          ))}
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
};

export default SignUp;