import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { Button } from "../components/ui/button";
import { useUserStore } from "../store/useUserStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useUserStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Login to your account
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="py-8 px-4 shadow sm-rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-black" aria-hidden="true" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 pl-10  border border-slate-700/50 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                  placeholder="doe@gmail.com"
                />
              </div>
            </div>
            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-black" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 pl-10 border border-slate-700/50 rounded-lg shadow-lg placeholder-slate-400 text-black focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-sm transition-all duration-300"
                  placeholder="*********"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full flex justify-center py-3 px-6 rounded-xl text-base font-medium text-black bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-400 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader
                    className="mr-2 size-5 animate-spin"
                    aria-hidden="true"
                  />
                  Signing in...
                </>
              ) : (
                <>Login</>
              )}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-zinc-600 ">
            Not a member?{" "}
            <Link
              to={"/signup"}
              className="font-medium text-orange-600  hover:text-orange-300 "
            >
              Signup here <ArrowRight className="inline size-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
