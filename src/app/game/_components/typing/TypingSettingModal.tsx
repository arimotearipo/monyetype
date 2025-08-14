import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"

type TypeSettingModalProps = {
  // onTimerChange: any;
  onMaxWordsChange: any
}

const TypingSettingModal = ({
  // onTimerChange,
  onMaxWordsChange,
}: TypeSettingModalProps) => {
  const [timer, setTimer] = useState<number>(10)
  // console.log("🚀 ~ timer2:", timer);
  const [maxWords, setMaxWords] = useState<number>(10)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault()
          }
        }}
      >
        <Settings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>Set custom time and words count</DialogDescription>
          <div className="flex flex-col justify-between gap-6">
            <Label>Time</Label>
            <Slider
              defaultValue={[10]}
              value={[timer]}
              max={100}
              step={1}
              onValueChange={(value) => setTimer(value[0])}
            />
            <Label>Words Count</Label>
            <Slider
              defaultValue={[10]}
              max={100}
              step={1}
              onValueChange={(value) => setMaxWords(value[0])}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant={"akmalmohtar"}
            onClick={() => {
              onMaxWordsChange(maxWords)
              setIsOpen(false)
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TypingSettingModal
