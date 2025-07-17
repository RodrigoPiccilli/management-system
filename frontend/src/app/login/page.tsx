import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginPage() {
    return (

        // Page Flexbox
        <div className="h-screen flex items-center justify-center bg-gray-200 ">

            <div className="flex flex-col border-8 border-gray-300 p-8 bg-white w-1/3 h-1/2 rounded-3xl">
            
                <h1 className="text-5xl mt-5 mb-5 text-center">Employee Login</h1>

                <div className="flex flex-col gap-2.5 p-5">
                    <Label className="text-lg" htmlFor="email">Email</Label>
                    <Input type="email" placeholder="Email"/>
                    <Label className="text-lg"  htmlFor="pin">PIN</Label>
                    <Input type="password" placeholder="PIN"/>
                    <Button className="mt-5.5 text-lg p-7 w-1/2 self-center">Log In</Button>
                </div>
            
            </div>

        </div>
    )
}

export default LoginPage;
