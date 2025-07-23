import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRouter } from "next/navigation"


export function TabsMenu() {

    const router = useRouter();

    const tabRoutes = {
        nvr: "/nvr",
        homeowners: "/homeowners",
        payables: "/payables",
    };


    return (
        <Tabs
            defaultValue="nvr"
            className="bg-slate-800 py-2 text-white"
            onValueChange={(value: string) => {
                const route = tabRoutes[value as keyof typeof tabRoutes];
                if (route) router.push(route);
            }}
        >
            <TabsList className="h-15 bg-slate-100 text-slate-700" >
                <TabsTrigger className="text-lg px-10 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:font-bold min-w-7 hover:bg-slate-300" value="nvr">NVR</TabsTrigger>
                <TabsTrigger className="text-lg px-10 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:font-bold min-w-7 hover:bg-slate-300" value="homeowners">Homeowners</TabsTrigger>
                <TabsTrigger className="text-lg px-10 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:font-bold min-w-7 hover:bg-slate-300" value="payables">Payables</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}