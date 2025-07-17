import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsMenu() {
  return (
    <Tabs defaultValue="jobs" className="">
        <TabsList className="h-15">
        <TabsTrigger className="text-lg px-10" value="jobs">Jobs</TabsTrigger>
        <TabsTrigger className="text-lg px-10" value="calendar">Calendar</TabsTrigger>
        <TabsTrigger className="text-lg px-10" value="template">Template</TabsTrigger>
        <TabsTrigger className="text-lg px-10" value="schedule">Schedule</TabsTrigger>
        <TabsTrigger className="text-lg px-10" value="payment">Payment</TabsTrigger>
        </TabsList>
    </Tabs>
  );
}