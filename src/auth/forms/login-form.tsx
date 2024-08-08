"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoginSchema } from "../schema/index";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "./card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { login } from "../actions/login";
import { KeyIcon, Mail } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already in use with different provider!"
    : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [ isPending, setIsPending ] = useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsPending(true);
    setError("");
    setSuccess("");

    login(values)
      .then((data) => {
        setError(data?.error);
        // setSuccess(data?.);
      })
      .finally(() => {
        setIsPending(false);
      });
    
  };

  return (
    <CardWrapper
      headerLabel="Login"
      backButtonLabel=""
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-6">
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        Icon={Mail}
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        Icon={KeyIcon}
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
            {/* )} */}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            option='rounded'
            variant='primary'
            className="w-full"
          >
            {isPending ? (<LoadingSpinner />) : ('Login')}
          </Button>
          <Button
            size="sm"
            variant="link"
            asChild
            className="px-0 font-normal text-gray-300 w-full"
          >
            <Link href="/auth/reset">
              Forgot password?
            </Link>
          </Button>

          <div className="flex flex-col font-normal text-sm text-gray-300">
            <ExclamationCircleIcon className="h-6 w-6 inline-block mx-auto text-wite rotate-180" />
            <p className="text-center">You’ll receive an account when making your first order.</p>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};