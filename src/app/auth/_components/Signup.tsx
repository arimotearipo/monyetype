"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { signupAction } from "@/actions/auth/signupAction"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BaseServerActionResponse, SignupInfo, SignupSchema } from "@/types"
import { cn } from "@/lib/utils"

export default function Signup() {
  const [submissionStatus, setSubmissionStatus] =
    useState<BaseServerActionResponse | null>(null)

  const form = useForm<SignupInfo>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
  })

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = form

  const handleSignup = async (data: SignupInfo) => {
    const res = await signupAction(data)
    setSubmissionStatus(res)
  }

  return (
    <motion.div
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 80, opacity: 1 }}
      transition={{ ease: "easeIn" }}
    >
      <Card className="w-[400px] space-y-4">
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Username</Label>
              <Input {...field} id={field.name} name={field.name} type="text" />
            </div>
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Email</Label>
              <Input {...field} id={field.name} name={field.name} type="text" />
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
                type="password"
              />
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor={field.name}>Confirm password</Label>
              <Input
                {...field}
                id={field.name}
                name={field.name}
                type="password"
              />
            </div>
          )}
        />

        <div className="flex flex-row justify-between items-center">
          <Button
            disabled={!isValid}
            onClick={handleSubmit(handleSignup)}
            variant={"akmalmohtar"}
            className="w-[80px]"
          >
            {isSubmitting ? <LoadingSpinner /> : "Signup"}
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
