// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Mail, Lock, Eye, EyeOff } from "lucide-react";
// import axios from "axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post("http://localhost:8000/api/login/", {
//         email,
//         password,
//       });

//       const { role, access, token } = response.data;

//       // normalize role always to lowercase
//       const normalizedRole = role ? role.toLowerCase() : "";

//       // JWT token, role, email store
//       // localStorage.setItem("token", access || token);
//       localStorage.setItem("token", response.data.access);
//       localStorage.setItem("refresh", response.data.refresh);
//       localStorage.setItem("role", normalizedRole);
//       localStorage.setItem("email", email);

//       setIsLoading(false);

//       // Redirect to dashboard
//       navigate("/dashboard");
//     } catch (err) {
//       setIsLoading(false);
//       setError("Invalid credentials, please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Logo and Welcome */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg" />
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
//           <p className="text-gray-500">Sign in to your account</p>
//         </div>

//         {/* Login Card */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-2xl font-semibold text-center mb-2">Sign In</h2>
//           <p className="text-sm text-center text-gray-500 mb-6">
//             Enter your credentials to access your dashboard
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="email"
//                   type="email"
//                   required
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="username@camelq.com"
//                   className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-4 w-4" />
//                   ) : (
//                     <Eye className="h-4 w-4" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Remember Me + Forgot Password */}
//             <div className="flex items-center justify-between">
//               <label className="flex items-center space-x-2 text-sm text-gray-700">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="rounded border-gray-300"
//                 />
//                 <span>Remember me</span>
//               </label>
//               <button
//                 type="button"
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Sign In Button */}
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity shadow-md"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Continue"}
//             </button>
//           </form>

//           {/* Error Message */}
//           {error && (
//             <p className="text-red-500 text-center text-sm mt-4">{error}</p>
//           )}

//           <div className="mt-6 text-center text-sm text-gray-500">
//             Need help? Contact your training coordinator
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      const { role, access, refresh } = response.data;

      // normalize role to lowercase
      const normalizedRole = role ? role.toLowerCase() : "";

      // store JWT token, role, and email
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("role", normalizedRole);
      localStorage.setItem("email", email);

      setIsLoading(false);

      if (normalizedRole === "admin") {
        navigate("/admin/dashboard");
      } else if (normalizedRole === "trainer") {
        navigate("/trainer/dashboard");
      } else if (normalizedRole === "trainee") {
        navigate("/trainee/dashboard");
      } else {
        navigate("/"); 
      }
    } catch (err) {
      setIsLoading(false);
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-center mb-2">Sign In</h2>
          <p className="text-sm text-center text-gray-500 mb-6">
            Enter your credentials to access your dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="username@camelq.com"
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md hover:opacity-90 transition-opacity shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Continue"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center text-sm mt-4">{error}</p>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Need help? Contact your training coordinator
          </div>
        </div>
      </div>
    </div>
  );
}
