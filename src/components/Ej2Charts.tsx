import React from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   Legend,
   Tooltip,
   LineSeries,
   Category,
} from "@syncfusion/ej2-react-charts";

const LineChart: React.FC = () => {
   const data = [
      { x: "Jan", y: 35 },
      { x: "Feb", y: 28 },
      { x: "Mar", y: 34 },
      { x: "Apr", y: 32 },
      { x: "May", y: 40 },
      { x: "Jun", y: 32 },
   ];

   return (
      <ChartComponent primaryXAxis={{ valueType: "Category" }}>
         <Inject services={[LineSeries, Legend, Tooltip, Category]} />
         <SeriesCollectionDirective>
            <SeriesDirective
               dataSource={data}
               xName="x"
               yName="y"
               type="Line"
               name="Series 1"
            />
         </SeriesCollectionDirective>
      </ChartComponent>
   );
};

export default LineChart;
