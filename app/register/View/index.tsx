"use client";

import { FC, useEffect, useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";

import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { create } from "@/actions/auth/actions";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
const initialState = {
  message: null,
  errors: {},
};
export const View: FC = () => {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(create, initialState);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
  }, [state.message]);

  return (
    <div className="flex mt-10 items-center justify-center px-5 lg:px-20">
      <div className="mx-auto my-6 flex w-full max-w-md flex-col rounded-lg border p-10 md:mt-0">
        <div className="mt-8">
          <div className="mt-6">
            <form className="space-y-6" action={formAction}>
              <div className="relative mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="メールアドレス"
                  className="block w-full rounded-lg border py-3 pl-3 pr-10 text-base transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span>
                    <EmailIcon />
                  </span>
                </div>

                {state?.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <div className="text-red-600 font-bold my-2" key={error}>
                      {error}
                    </div>
                  ))}
              </div>

              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="パスワード"
                  className="block w-full rounded-lg border py-3 pl-3 pr-10 text-base transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
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
                {state?.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <div className="text-red-600 font-bold my-2" key={error}>
                      {error}
                    </div>
                  ))}
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blueColor mx-auto mt-8 block h-10 w-full rounded bg-bgRegister px-5 text-center text-textWhite"
                  disabled={pending}
                >
                  {pending ? (
                    <CircularProgress color="inherit" size={25} />
                  ) : (
                    "登録"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-2">
              <div>
                <Link href="/login" className="font-bold">
                  すでにアカウントを持っている
                </Link>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
