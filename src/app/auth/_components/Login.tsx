"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { loginAction } from "@/actions/auth/loginAction"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { LoginInfo, LoginSchema, BaseServerActionResponse } from "@/types"
import { cn } from "@/lib/utils"

export default function Login() {
  const [submissionStatus, setSubmissionStatus] =
    useState<BaseServerActionResponse | null>(null)

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<LoginInfo>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  })

  const handleLogin = async (data: LoginInfo) => {
    const res = await loginAction(data)
    setSubmissionStatus(res)

    if (res.success) {
      localStorage.setItem("username", res.user.username)
    }
  }

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                {...field}
                id={field.name}
                name={field.name}
                type={field.name}
              />
            </div>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Password</Label>
              <Input
                {...field}
                id={field.name}
                name={field.name}
                type={field.name}
              />
            </div>
          )}
        />

        <div className="flex flex-row justify-between items-center">
          <Button
            disabled={!isValid}
            onClick={handleSubmit(handleLogin)}
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
      </Card>
    </motion.div>
  )
}
