import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Login from "./_components/Login"
import Signup from "./_components/Signup"

export default function AuthPage() {
  return (
    <Tabs defaultValue="login">
      <TabsList className="grid grid-cols-2 rounded-sm p-0 ">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Login />
      </TabsContent>
      <TabsContent value="signup">
        <Signup />
      </TabsContent>
    </Tabs>
  )
}
