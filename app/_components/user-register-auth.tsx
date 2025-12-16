"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";
import { Input } from "./ui/input";
import { signIn } from "next-auth/react";
import { CartContext } from "../_context/cart";

interface IUser {
  name: string;
  email: string;
  password: string;
}

const UserRegisterAuth = () => {
  const router = useRouter();
  const tempOrderId = crypto.randomUUID();
  const { totalQuantity } = useContext(CartContext);

  const [data, setData] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<IUser> & { server?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    // Validação simples para verificar se os campos estão preenchidos
    const newErrors: Partial<IUser> = {};
    if (!data.name) newErrors.name = "Nome é obrigatório";
    if (!data.email) newErrors.email = "Email é obrigatório";
    if (!data.password) newErrors.password = "Senha é obrigatória";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const request = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (!request.ok) {
      if (response.error === "Existing email.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Este email já está registrado",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          server: response.error,
        }));
      }
    } else {
      const login = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      if (login?.error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          server: "Erro ao fazer login após o registro.",
        }));
      } else {
        if (totalQuantity > 0) {
          router.push(`/checkout-payment?order=${tempOrderId}`);
          return;
        }
      }
      router.push("/");
      //router.push("/login");
    }

    setData({
      name: "",
      email: "",
      password: "",
    });
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setErrors((prev) => {
      return { ...prev, [e.target.name]: "" };
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <form onSubmit={onSubmit} className="px-5 lg:px-10">
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label className="sr-only" htmlFor="name">
              Nome
            </label>
            <Input
              id="name"
              placeholder="Nome"
              type="text"
              disabled={isLoading}
              name="name"
              value={data.name}
              onChange={handleChange}
              className="my-5 h-12 rounded-2xl border-none bg-[#e5e7eb] 
        px-4 focus:border-gray-800 focus:ring focus:ring-gray-800"
            />
            {errors.name && (
              <span className="text-xs text-red-500">{errors.name}</span>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoComplete="email"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
              className="my-5 h-12 rounded-2xl border-none bg-[#e5e7eb] 
        px-4 focus:border-gray-800 focus:ring focus:ring-gray-800"
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>

          <div>
            <label className="sr-only" htmlFor="password">
              Senha
            </label>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
              className="my-5 h-12 rounded-2xl border-none bg-[#e5e7eb] 
        px-4 focus:border-gray-800 focus:ring focus:ring-gray-800"
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>
        </div>

        <div className="flex pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex h-14 w-full items-center 
      justify-center rounded-3xl border border-transparent bg-primary 
      bg-tematic px-4  text-base font-semibold uppercase text-white 
      hover:bg-son"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrar
          </button>
        </div>

        {errors.server && (
          <span className="mt-2 block text-center text-xs text-red-500">
            {errors.server}
          </span>
        )}
      </form>
    </div>
  );
};

export default UserRegisterAuth;
