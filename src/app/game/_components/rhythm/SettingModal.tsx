import React, { useReducer, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { TRhythmSettings } from "@/types"
import { useRhythmSettingsStore } from "@/hooks/zustand/use-rhythm-settings"
import { useForm, Controller } from "react-hook-form"
import { Settings } from "lucide-react"

export default function SettingModal({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false)

  const rhythmSettings = useRhythmSettingsStore((state) => state.rhythmSettings)
  const saveSettings = useRhythmSettingsStore((state) => state.saveSettings)

  const { handleSubmit, control } = useForm<TRhythmSettings>({
    defaultValues: rhythmSettings,
  })

  const submitSettings = (value: TRhythmSettings) => {
    saveSettings(value)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} onClick={onOpen}>
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>
            Configure your gameplay experience
          </DialogDescription>
        </DialogHeader>

        <Controller
          name="gameDuration"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 space-x-4">
              <Label htmlFor={field.name}>Game duration in milliseconds</Label>
              <Input
                {...field}
                id={field.name}
                type="number"
                min={0}
                value={field.value}
              />
            </div>
          )}
        />

        <Controller
          name="letterDuration"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 space-x-4">
              <Label htmlFor={field.name}>
                Duration per letter in milliseconds
              </Label>
              <Input
                {...field}
                id={field.name}
                type="number"
                min={0}
                value={field.value}
              />
            </div>
          )}
        />

        <Controller
          name="enableNextLetter"
          control={control}
          render={({ field }) => (
            <div className="flex space-x-2">
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <Label htmlFor={field.name}>Enable next letter preview</Label>
            </div>
          )}
        />

        <Controller
          name="enableNumbers"
          control={control}
          render={({ field }) => (
            <div className="flex space-x-2">
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <Label htmlFor={field.name}>Enable numbers</Label>
            </div>
          )}
        />

        <Controller
          name="enableSpecialCharacters"
          control={control}
          render={({ field }) => (
            <div className="flex space-x-2">
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <Label htmlFor={field.name}>Enable special characters</Label>
            </div>
          )}
        />

        <Controller
          name="enableUppercaseLetters"
          control={control}
          render={({ field }) => (
            <div className="flex space-x-2">
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <Label htmlFor={field.name}>Enable uppercase letters</Label>
            </div>
          )}
        />

        <Controller
          name="enableUppercaseSpecialCharacters"
          control={control}
          render={({ field }) => (
            <div className="flex space-x-2">
              <Checkbox
                id={field.name}
                checked={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <Label htmlFor={field.name}>
                Enable uppercase special characters (special characters that
                requires you to hold shift)
              </Label>
            </div>
          )}
        />

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            variant={"akmalmohtar"}
            onClick={handleSubmit(submitSettings)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
