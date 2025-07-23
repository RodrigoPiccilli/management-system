import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Tailwind Color Scheme:
 * bg-blue-900
 * bg-blue-400
 * bg-gray-100
 * bg-gray-400
 * bg-gray-600
 */

export function TabsMenu() {
  return (
    <Tabs defaultValue="jobs" className="bg-gray-400 py-2">
        <TabsList className="h-15 bg-gray-100 self-center">
        <TabsTrigger className="text-lg px-10 data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:font-bold min-w-7" value="jobs">NVR</TabsTrigger>
        <TabsTrigger className="text-lg px-10 data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:font-bold min-w-7" value="calendar">Homeowners</TabsTrigger>
        <TabsTrigger className="text-lg px-10 data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:font-bold min-w-7" value="template">Payables</TabsTrigger>
        {/* <TabsTrigger className="text-lg px-10" value="schedule">Schedule</TabsTrigger>
        <TabsTrigger className="text-lg px-10" value="payment">Payment</TabsTrigger> */}
        </TabsList>
    </Tabs>
  );
}