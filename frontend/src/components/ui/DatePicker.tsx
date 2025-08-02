"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    onDateChange?: (date: Date | undefined) => void
    value?: Date | undefined
}

export function DatePicker({ onDateChange, value }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(value)

    React.useEffect(() => {
        setDate(value)
    }, [value])

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate)
        setOpen(false)
        onDateChange?.(selectedDate)
    }

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={handleDateSelect}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}