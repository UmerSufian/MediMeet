"use client"
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

const Search = ({ params }: any) => {
  const [doctorList, setDoctorList] = useState([]);
  const formattedCname = decodeURIComponent(params.cname.replace(/\+/g, " ")).replace(/[%\d]/g, "");

  useEffect(() => {
    const getDoctors = () => {
      GlobalApi.getDoctorByCategory(params.cname).then((res:any) => {
        setDoctorList(res.data.data);
      });
    };

    getDoctors(); // Call getDoctors inside the useEffect callback

  }, [params.cname]); // Include params.cname in the dependency array

  return (
    <div className="mt-5">
      <DoctorList heading={formattedCname} doctorList={doctorList} />
    </div>
  );
};

export default Search;
