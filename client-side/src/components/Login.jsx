import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/actions/actionCreators/user";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      if (form.name === "" || form.password === "")
        throw { name: "Invalid email/password" };
      navigate("/");
      dispatch(login(form));
    } catch (error) {
      console.log(error.name);
    }
  };

  return (
    <>
      <section
        className="bg-black h-screen flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://img10.hotstar.com/image/upload/f_auto,q_90,w_2048/feature/onboarding/31-07-2023-id-background-desktop.png')",
          backgroundSize: "cover",
        }}
      >
        <div className="w-[400px] h-[600px] p-6  bg-black bg-opacity-40 backdrop-blur-lg  rounded-lg shadow-md">
          <h1 className="text-2xl pt-20 text-white font-semibold mb-6">
            Sign In to Disney+
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-medium">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-medium">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-white text-sm text-center">
            New to Disney+?
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="text-blue-600 font-semibold pl-2 cursor-pointer"
            >
              Sign up now
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
