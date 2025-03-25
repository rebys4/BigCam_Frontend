import React, { useState, useRef, memo, useEffect } from "react";
import NavBar from "../../components/navbar/NavBar";
import { MdOutlinePhotoCamera } from "react-icons/md";
import axios from "axios";
import { useUser } from "../../http/UserContext/UserContext";

const Profile = memo(() => {
  const { userData, updateUser } = useUser();
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState( "");
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName);
      setEmail(userData.email);
      setDob(userData.dob);
    }
  }, [userData]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("http://localhost:8080/upload-avatar", formData);
      console.log("Ответ от сервера:", data);
      updateUser({ avatar: data.avatarUrl });
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const openFileDialog = () => fileInputRef.current?.click();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ fullName, email, dob });
    setIsEditing(false);
  };

  return (
      <main className="min-h-screen bg-gray-100">
        <NavBar />
        <section className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
          {/* Блок аватара */}
          <article className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <div className="relative mt-10">
              <img
                  className="w-48 h-48 rounded-full object-cover"
                  src={preview || ""}
                  alt="Аватар пользователя"
              />
              <button
                  type="button"
                  onClick={openFileDialog}
                  className="absolute bottom-2 right-2 flex items-center justify-center bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition-colors"
                  aria-label="Изменить аватар"
              >
                <MdOutlinePhotoCamera className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
              </button>
              <input
                  type="file"
                  name="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
              />
            </div>
          </article>

          {/* Блок профиля */}
          <article className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg p-6">
            <header className="mb-4">
              <h1 className="text-3xl text-black font-Roboto">Профиль</h1>
            </header>
            <section>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="text-lg text-black font-Roboto">
                    ФИО
                  </label>
                  <input
                      id="fullName"
                      type="text"
                      placeholder="Введите ФИО"
                      value={fullName}
                      disabled={!isEditing}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg text-black font-Roboto">
                    Электронная почта
                  </label>
                  <input
                      id="email"
                      type="email"
                      placeholder="Введите электронную почту"
                      value={email}
                      disabled={!isEditing}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="dob" className="text-lg text-black font-Roboto">
                    Дата рождения
                  </label>
                  <input
                      id="dob"
                      type="date"
                      value={dob}
                      disabled={!isEditing}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                {isEditing ? (
                    <button
                        type="submit"
                        className="w-full bg-[#ea5f5f] text-black text-lg font-Roboto py-3 rounded-full shadow-md hover:bg-[#d95353] transition-colors"
                    >
                      Сохранить
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditing(true);
                        }}
                        className="w-full bg-[#ea5f5f] text-black text-lg font-Roboto py-3 rounded-full shadow-md hover:bg-gray-400 transition-colors"
                    >
                      Редактировать
                    </button>
                )}
              </form>
            </section>
          </article>
        </section>
      </main>
  );
});

export default Profile;
