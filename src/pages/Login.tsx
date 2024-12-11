import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importa axios para hacer la llamada HTTP
import { useAuthStore } from '../store/authStore';
import { Wallet } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onSubmit = async (data: LoginForm) => {
    try {
      // Hacer la solicitud POST a tu backend para hacer login
      const response = await axios.post('http://localhost:3001/auth/signin', {
        email: data.email,
        password: data.password
      });
  
      // Si el login es exitoso, guarda el token en localStorage
      localStorage.setItem('accessToken', response.data.accessToken);
  
      // Si es necesario, también puedes guardar datos adicionales en el estado global si lo necesitas
      setAuth(response.data.alldata, response.data.accessToken);
      
      // Redirige al Dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = 'http://localhost:3001/auth/google'; // Redirige al flujo de autenticación con Google
  };

  const goToRegister = () => {
    navigate('/register'); // Redirige a la página de registro
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="flex items-center justify-center mb-6">
          <Wallet className="h-12 w-12 text-indigo-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <span className="block h-px bg-gray-300 w-1/3"></span>
          <span className="text-gray-500 mx-3 text-sm">OR</span>
          <span className="block h-px bg-gray-300 w-1/3"></span>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5 mr-2"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.21 0 5.98 1.06 8.18 2.98l6.06-6.06C34.28 3.05 29.45 1 24 1 14.77 1 7.07 6.76 3.65 14.26l7.29 5.66C12.74 13.42 17.9 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M9.9 28.73C8.77 25.92 8.77 22.08 9.9 19.27l-7.3-5.66C-1.01 17.23-1.01 29.77 2.6 37.4l7.3-5.67z"
            />
            <path
              fill="#4A90E2"
              d="M24 46c5.45 0 10.28-2.05 14.04-5.42l-7.3-5.67C28.72 36.94 26 37.5 24 37.5c-6.11 0-11.26-3.92-13.36-9.42l-7.29 5.66C7.07 41.24 14.77 46 24 46z"
            />
            <path
              fill="#FBBC05"
              d="M46.27 20H24v8.5h12.73c-1.57 4.23-5.3 7.28-10.09 7.28-6.11 0-11.26-3.92-13.36-9.42l-7.29 5.66C12.74 36.58 17.9 40.5 24 40.5c5.74 0 10.71-2.89 13.66-7.12 1.61-2.41 2.52-5.32 2.52-8.38 0-.73-.06-1.45-.15-2.15H46.27z"
            />
          </svg>
          Sign in with Google
        </button>
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            onClick={goToRegister}
            className="text-indigo-600 text-sm font-semibold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
