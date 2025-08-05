import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import TypingTest from "./_components/typing/Typing"
import { Rhythm } from "./_components/rhythm/Rhythm"

export default function GamePage() {
  return (
    <Tabs
      defaultValue="typing"
      className="w-full h-full flex flex-col space-y-10 items-center"
    >
      <TabsList className="grid grid-cols-2 rounded-sm p-0">
        <TabsTrigger value="typing">Typing Test</TabsTrigger>
        <TabsTrigger value="rhythm">Rhythm Letter</TabsTrigger>
      </TabsList>
      <TabsContent
        value="typing"
        className="flex items-start border border-red-500"
      >
        <TypingTest />
      </TabsContent>
      <TabsContent value="rhythm" className="flex items-start">
        <Rhythm />
      </TabsContent>
    </Tabs>
  )
}
