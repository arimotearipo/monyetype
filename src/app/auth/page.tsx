import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Login from "./_components/Login"
import Signup from "./_components/Signup"

export default function AuthPage() {
  return (
    <Tabs
      defaultValue="login"
      className="w-full h-full flex flex-col space-y-10 items-center"
    >
      <TabsList className="grid grid-cols-2 rounded-sm p-0">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="flex items-start">
        <Login />
      </TabsContent>
      <TabsContent value="signup" className="flex items-start">
        <Signup />
      </TabsContent>
    </Tabs>
  )
}
