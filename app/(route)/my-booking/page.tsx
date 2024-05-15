"use client"
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

function MyBooking() {
    const { user } = useKindeBrowserClient()
    const [bookingList, setBookingList] = useState([]);

    const getUserBookingList = () => {
        GlobalApi.getUserBookingList(user?.email).then(resp => {
            console.log(resp.data.data)
            setBookingList(resp.data.data);
        })
    }

    useEffect(() => {
        user && getUserBookingList();
    }, [user, getUserBookingList]) // Include getUserBookingList in the dependency array

    const filterUserBooking = (type:any) => {
        const result = bookingList.filter(item =>
            type === 'upcoming' ? new Date(item.attributes.Date) >= new Date()
                : new Date(item.attributes.Date) <= new Date()
        )
        console.log(result)
        return result;
    }

    return (
        <div className="px-4 sm:px-10 mt-10">
            <h2 className="font-bold text-2xl">MyBooking</h2>
            <Tabs defaultValue="upcoming" className="w-full mt-5">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="expired">Expired</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                    <BookingList bookingList={filterUserBooking('upcoming')} updateRecord={() => getUserBookingList()} expired={false} />
                </TabsContent>
                <TabsContent value="expired">
                    <BookingList bookingList={filterUserBooking('expired')} updateRecord={() => getUserBookingList()} expired={true} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default MyBooking;
