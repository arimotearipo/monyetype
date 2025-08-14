"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { loginAction } from "@/actions/auth/loginAction"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { LoginInfo, LoginSchema, BaseServerActionResponse } from "@/types"
import { cn } from "@/lib/utils"
import { Form, FormField, FormLabel, FormMessage } from "@/components/ui/form"

export default function Login() {
  const [submissionStatus, setSubmissionStatus] =
    useState<BaseServerActionResponse | null>(null)

  const form = useForm<LoginInfo>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form

  const handleLogin = handleSubmit(async (data: LoginInfo) => {
    const res = await loginAction(data)
    setSubmissionStatus(res)
    if (res.success) {
      localStorage.setItem("username", res.user.username)
    }
  })

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <Form {...form}>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <div>
                <FormLabel htmlFor={field.name}>Email</FormLabel>
                <Input
                  {...field}
                  id={field.name}
                  name={field.name}
                  type={field.name}
                />
                <FormMessage />
              </div>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <div>
                <FormLabel htmlFor={field.name}>Password</FormLabel>
                <Input
                  {...field}
                  id={field.name}
                  name={field.name}
                  type={field.name}
                />
                <FormMessage />
              </div>
            )}
          />

          <div className="flex flex-row justify-between items-center">
            <Button
              disabled={!isValid}
              onClick={handleLogin}
              variant={"akmalmohtar"}
              className="w-[80px]"
            >
              {isSubmitting ? <LoadingSpinner /> : "Login"}
            </Button>
            {submissionStatus && (
              <p
                className={cn("text-green-500", {
                  "text-red-500": !submissionStatus.success,
                })}
              >
                {submissionStatus.message}
              </p>
            )}
          </div>
        </Form>
      </Card>
    </motion.div>
  )
}
