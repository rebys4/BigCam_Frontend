import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../http/UserContext/UserContext';
import { observer } from 'mobx-react-lite';

const SignIn = observer(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [serverError, setServerError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {}
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Введите корректный email'
    }
    if (password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const payload = {
         email:`${formData.email}`,
         password:`${formData.password}`,
      };

      const result = await login(payload);
      if (result && (result.success || result.value)) {
        console.log("Успешная авторизация", result);
        navigate('/main');
      } else {
        setServerError(result.message || 'Ошибка авторизации');
        console.log("Ошибка авторизации", result);
      }
    }
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-black/20">
      <section className="flex flex-col justify-center items-center w-[700px] h-[570px] p-[61px] bg-white rounded-[50px] shadow-2xl">
        <header className="flex items-center justify-center h-[54px]">
          <img className="w-38 h-38" src="/assets/exercise.png" alt="Exercise Icon" />
          <h1 className="ml-2 text-3xl font-normal text-center text-black font-roboto">FitnessRemote</h1>
        </header>
        <div className="w-full flex flex-col items-center mt-8">
          <label htmlFor="email" className="text-lg text-black font-roboto">Электронная почта</label>
          <input
            type="email"
            id="email"
            className="w-[394px] p-[30px] mt-2 text-xl rounded-[50px] border-none bg-white shadow-md"
            placeholder="trainer@yandex.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </div>
        <div className="w-full flex flex-col items-center mt-8">
          <label htmlFor="password" className="text-lg text-black font-roboto">Пароль</label>
          <input
            type="password"
            id="password"
            className="w-[394px] p-[30px] mt-2 mb-8 text-xl rounded-[50px] border-none bg-white shadow-md"
            placeholder="*************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className='text-red-500'>{errors.password}</p>}
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-[394px] h-[81px] mt-2 flex flex-shrink-0 justify-center items-center bg-[#ea5f5f] rounded-[500px] shadow-lg text-black text-xl font-roboto hover:bg-[#d95353] transition-colors"
        >
          Войти
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="mt-4 text-black text-xl font-roboto"
        >
          Нет аккаунта? Зарегистрироваться
        </button>
      </section>
    </main>
  );
});

export default SignIn;