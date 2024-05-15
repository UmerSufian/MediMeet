"use client"
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";

interface Doctor {
  id: string; // Assuming the 'id' property is of type string
  // Add other properties of the 'doctor' object here
}

interface TimeSlot {
  time: string;
}

function BookAppointment({ doctor }: { doctor: Doctor }) {
    const [date, setDate] = useState<Date>(new Date());
    const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
    const { user } = useKindeBrowserClient();

    useEffect(() => {
        getTime();
    }, []);

    const getTime = () => {
        const timeList: TimeSlot[] = [];
        for (let i = 10; i <= 12; i++) {
            timeList.push({
                time: i + ':00 AM'
            });
            timeList.push({
                time: i + ':30 AM'
            });
        }
        for (let i = 1; i <= 6; i++) {
            timeList.push({
                time: i + ':00 PM'
            });
            timeList.push({
                time: i + ':30 PM'
            });
        }
        setTimeSlot(timeList);
    }

    const saveBooking = () => {
        const data = {
            data: {
                UserName: user?.given_name + " " + user?.family_name,
                Email: user?.email,
                Time: selectedTimeSlot,
                Date: date,
                doctor: doctor.id
            }
        }

        GlobalApi.bookAppointment(data).then((resp: any) => {
            console.log(resp);
            if (resp) {
                GlobalApi.sendEmail(data).then((resp: any) => {
                    console.log(resp);
                })
                toast("Booking Confirmation sent on Email");
            }
        })
    }

    const isPastDay = (day: Date) => {
        return day < new Date();
    }

    // Define the event handler for date selection
    const handleDateSelect = (day: Date | undefined) => {
        if (day) {
            setDate(day); // Update the date state with the selected day
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className='mt-3 rounded-full'>Book Appointment</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book Appointment</DialogTitle>
                    <DialogDescription>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                                {/* Calendar */}
                                <div className="flex flex-col gap-3 items-baseline">
                                    <h2 className="flex gap-2 items-center">
                                        <CalendarDays className="text-primary h-5 w-5" />
                                        Select Date
                                    </h2>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateSelect} // Use the corrected event handler here
                                        disabled={isPastDay}
                                        className="rounded-md border"
                                    />
                                </div>

                                {/* Time Slot */}
                                <div className="mt-3 md:mt-0">
                                    <h2 className="flex gap-2 items-center">
                                        <Clock className="text-primary h-5 w-5 mb-3 " />
                                        Select Time Slot
                                    </h2>
                                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                                        {timeSlot && timeSlot.map((item, index) => (
                                            <h2 onClick={() => setSelectedTimeSlot(item.time)} key={index} className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${item.time == selectedTimeSlot && 'bg-primary text-white'}`}>
                                                {item.time}
                                            </h2>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <>
                            <Button type="button" className="text-red-500 border-red-500" variant="outline">
                                Close
                            </Button>
                            <Button type="button" disabled={!(date && selectedTimeSlot)} onClick={saveBooking}>
                                Submit
                            </Button>
                        </>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default BookAppointment;
