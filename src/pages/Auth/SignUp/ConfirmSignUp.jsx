import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmSignUp = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [showResendButton, setShowResendButton] = useState(false);
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer);
        } else {
            setShowResendButton(true);
        }
    }, [timeLeft]);

    const handleResendCode = async () => {
        try {
            await axios.post('http://localhost:3001/resend-code', {});
            setMessage("Код повторно отправлен")
            setTimeLeft(60);
            setShowResendButton(false);
        } catch (error) {
            setMessage("Произошла ошибка при отправке кода");
        }
    }

    const handleConfirmCode = async () => {
        try {
            const response = await axios.post('http://localhost:3001/resend-code', { code });
            if (response.data.access) {
                navigate("/main");
            } else {
                setMessage("Неверный код");
            }
        } catch (error) {
            setMessage("Произошла ошибка при отправке кода");
        }
    }

    return (
        <main className="flex justify-center items-center w-screen h-screen bg-black/20">
            <section className="w-[698px] h-[570px] relative bg-white rounded-[50px] overflow-hidden">
                <header className="w-[394px] h-[54px] left-[143px] top-[14px] absolute justify-center items-center inline-flex">
                    <img className="w-38 h-38" src="/assets/exercise.png" alt="Exercise Icon" />
                    <h1 className="ml-2 text-3xl font-normal text-center text-black font-roboto">BigCam</h1>
                </header>

                <section className="h-[63px] left-[150px] top-[107px] absolute flex-col justify-start items-center gap-[21px] inline-flex">
                    <h2 className="self-stretch text-black text-xl font-normal font-roboto">Подтверждение через электронную почту</h2>
                    <p className="self-stretch text-center text-[#858181] text-base font-normal font-Roboto">Введите код, отправленный на вашу почту</p>
                </section>

                <form className="left-[150px] top-[209px] absolute flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="w-[394px] px-[30px] py-[27px] bg-white rounded-[500px] shadow-md justify-start items-center gap-2.5 inline-flex overflow-hidden">
                        <input
                            type="text"
                            value={code}
                            placeholder="Код подтверждения"
                            onChange={(e) => setCode(e.target.value)}
                            className="text-black text-base font-normal font-roboto bg-transparent outline-none w-full"
                        />
                    </div>
                    {message && <p className="text-red-500">{message}</p>}
                </form>

                <button
                    onClick={handleConfirmCode}
                    type="button"
                    className="w-[394px] h-[81px] px-[168px] py-[29px] left-[150px] top-[341px] absolute bg-[#ea5f5f] rounded-[500px] shadow-md justify-center items-center gap-2.5 inline-flex overflow-hidden text-lg hover:bg-[#d95353] transition-colors"
                >
                    <span 
                        className="text-black font-normal"
                    />Подтвердить
                </button>

                <footer className="left-[252px] top-[473px] absolute text-black text-xl font-normal font-Roboto">
                    {showResendButton ? (
                        <button
                            type="submit"
                            onClick={handleResendCode}
                            className="w-[394px] h-[81px] absolute bg-[#ea5f5f] hover:bg-[#d95353] rounded-[500px] shadow-md justify-center overflow-hidden transition-colors"
                        >
                            Повторно выслать код
                        </button>
                    ) : (
                        `Повторно через ${timeLeft}s`
                    )}
                </footer>
            </section>
        </main>
    );
};

export default ConfirmSignUp;