import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Hero() {
  return (
    <section>
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
        <Image
          alt=""
          src="/doctors.jpg"
          height={800}
          width={800}
          className="absolute inset-0 h-full rounded-3xl w-full object-cover"
        />
      </div>

      <div className="lg:py-24">
        <h2 className="text-3xl font-bold sm:text-4xl">Find & Book <span className='text-primary'>Appointment</span> with your Favourite <span className='text-primary'>Doctors</span></h2>

        <p className="mt-4 text-gray-600">
        Welcome to MediMeet, your one-stop solution for hassle-free doctor appointments. Say goodbye to long waiting times and endless phone calls. With our intuitive platform, scheduling your next medical consultation is as easy as a few clicks. Experience seamless healthcare access with MediMeet today.
        </p>

        <Button className='mt-10'>Explore Now</Button>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero