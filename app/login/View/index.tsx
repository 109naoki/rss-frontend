"use client";

import React, { FC, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export const View: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res?.error) {
      router.push("/");
      toast.success("ログインしました");
    } else {
      toast.error("ログインに失敗しました");
    }
  };

  return (
    <div className="flex mt-10  items-center justify-center px-5 lg:px-20">
      <div className="mx-auto my-6 flex w-full max-w-md flex-col rounded-lg border p-10 md:mt-0">
        <div className="mt-8">
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative mt-1">
                <input
                  name="email"
                  type="email"
                  placeholder="メールアドレス"
                  className="block w-full rounded-lg border py-3 pl-3 pr-10 text-base transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span>
                    <EmailIcon />
                  </span>
                </div>
              </div>

              <div className="relative mt-1">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワード"
                  className="block w-full rounded-lg border py-3 pl-3 pr-10 text-base transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <span>
                      <LockIcon />
                    </span>
                  ) : (
                    <span>
                      <VisibilityIcon />
                    </span>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blueColor mx-auto mt-4 block h-10 w-full rounded bg-bgRegister px-5 text-center text-textWhite"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    "ログイン"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-2">
              <div>
                <Link href="/register" className="font-bold">
                  新規登録はこちら
                </Link>
              </div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
