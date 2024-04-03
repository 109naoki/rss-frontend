"use server";
import { z } from "zod";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "必須項目です" }),
});
let apiUrl = "";

const localApiUrl = process.env.LOCAL_API_URL;
const prodApiUrl = process.env.PROD_API_URL;

if (process.env.NODE_ENV === "development") {
  apiUrl = localApiUrl!;
} else if (process.env.NODE_ENV === "production") {
  apiUrl = prodApiUrl!;
}

export const create = async (
  prevState: { message: string | null },
  data: FormData
) => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const validation = schema.safeParse({ email, password });
  if (!validation.success) {
    return {
      message: null,
      errors: validation.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    if (res.status === 401 || res.status === 500) {
      return { message: "メールアドレスかパスワードが違います" };
    }
  } catch (error) {
    return { message: "メールアドレスかパスワードが違います" };
  }
  redirect("/login");
};
export const login = async (
  prevState: { message: string | null },
  data: FormData
) => {
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  const validation = schema.safeParse({ email, password });
  if (!validation.success) {
    return {
      message: null,
      errors: validation.error.flatten().fieldErrors,
    };
  }
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 401 || res.status === 500) {
      return { message: "メールアドレスかパスワードが違います" };
    }
    const responseBody = await res.json();
    console.log(responseBody);
  } catch (error) {
    return { message: "メールアドレスかパスワードが違います" };
  }
  redirect("/");
};
