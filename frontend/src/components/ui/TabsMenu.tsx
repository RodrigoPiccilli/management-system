import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// | Element       | Tailwind Class               | Example                            |
// | ------------- | ---------------------------- | ---------------------------------- |
// | Primary Color | `indigo-600`                 | `bg-indigo-600`, `text-indigo-600` |
// | Secondary     | `gray-500` / `gray-700`      | `hover:bg-gray-100`                |
// | Background    | `gray-50` / `gray-100`       | Body/table backgrounds             |
// | Borders       | `gray-200`                   | Table lines, input borders         |
// | Text          | `gray-800` / `gray-900`      | Main text                          |
// | Headings      | `gray-900`                   | Page titles                        |
// | Muted Text    | `gray-500`                   | Sub-labels, placeholder text       |
// | Accent Hover  | `indigo-700` or `indigo-500` | Buttons, row hover                 |


export function TabsMenu() {
  return (
    <Tabs defaultValue="jobs" className="bg-slate-400 py-2">
        <TabsList className="h-15 bg-gray-100">
        <TabsTrigger className="text-lg px-10 data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:font-bold min-w-7" value="jobs">NVR</TabsTrigger>
        <TabsTrigger className="text-lg px-10 data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:font-bold min-w-7" value="calendar">Homeowners</TabsTrigger>
        <TabsTrigger className="text-lg px-10 data-[state=active]:bg-gray-400 data-[state=active]:text-white data-[state=active]:font-bold min-w-7" value="template">Payables</TabsTrigger>
        {/* <TabsTrigger className="text-lg px-10" value="schedule">Schedule</TabsTrigger>
        <TabsTrigger className="text-lg px-10" value="payment">Payment</TabsTrigger> */}
        </TabsList>
    </Tabs>
  );
}