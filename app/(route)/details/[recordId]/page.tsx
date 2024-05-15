"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'
import DoctorDetail from '../_components/DoctorDetail';

interface Doctor {
  id: string;
  attributes: {
    Name: string;
    Year_of_Experience: number;
    Address: string;
    categories: {
      data: {
        attributes: {
          Name: string;
        };
      }[];
    };
    About: {
      children: {
        text: string;
      }[];
    }[];
    // Add other properties as needed
  };
}

function Details({ params }:any) {

  const [doctor, setDoctor] = useState<Doctor | null>(null); 

  useEffect(() => {
    const getDoctorById = async () => {
      try {
        const resp = await GlobalApi.getDoctorById(params.recordId);
        console.log(resp);
        setDoctor(resp.data.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorById();
  }, [params.recordId]);

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Details</h2>

      <div className='grid grid-cols-1 lg:grid-cols-4'>
        {/* Doctor Detail */}
        <div className='col-span-3'>
         {doctor && <DoctorDetail doctor={doctor}/>}
        </div>
        {/* Doctor Suggestion */}
        <div>
          {/* <DoctorSuggestionList/> */}
        </div>
      </div>
    </div>
  );
}

export default Details;
