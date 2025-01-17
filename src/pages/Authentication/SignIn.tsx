import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockIcon, UserIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const SignIn = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggingIn, loginError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ name, password });
      navigate("/welcome"); // Redirect ke /welcome setelah login berhasil
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex dark:bg-slate-900 justify-center items-center h-screen md:px-24 p-4">
      <div className="rounded-sm border border-stroke bg-white md:px-24 w-full p-4 shadow-default dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <div className="mb-5.5 inline-block">
                <img
                  className="hidden dark:block w-16 h-10"
                  src="/images/favicon.webp"
                  alt="Logo"
                />
                <img
                  className="dark:hidden w-16 h-10"
                  src="/images/favicon.webp"
                  alt="Logo"
                />
              </div>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-slate-700 xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Masuk
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Masukkan nama anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      required
                    />
                    <UserIcon className="absolute right-4 top-4 text-slate-500" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Masukkan password anda"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary"
                      required
                    />
                    <LockIcon className="absolute right-4 top-4 text-slate-500" />
                  </div>
                </div>

                {loginError && (
                  <div className="mb-4 text-red-500 text-sm">
                    {loginError.message ||
                      "Login gagal. Periksa nama dan password Anda."}
                  </div>
                )}

                <div className="mb-5">
                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    {isLoggingIn ? "Memproses..." : "Masuk"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
