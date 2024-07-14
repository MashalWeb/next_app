"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Charts({ name = "bar" }: any) {
   const option = {
      chart: {
         id: "apexchart-example",
      },
      xaxis: {
         categories: [
            "jan",
            "feb",
            "mar",
            "april",
            "may",
            "june",
            "july",
            "aug",
            "sep",
         ],
      },
   };

   const series = [
      {
         name: "series-1",
         data: [230, 101, 23, 50, 49, 60, 70, 91, 32],
      },
   ];

   return (
      <>
         <ApexChart
            type={name}
            options={option}
            series={series}
            height={200}
            width={450}
         />
      </>
   );
}
export default Charts;
