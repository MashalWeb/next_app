Certainly! Here are examples of Syncfusion `ej2-react-charts` integrated into a Next.js project using TypeScript. I'll provide TypeScript versions of some common chart types:

### 1. Line Chart

```tsx
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
```

### 2. Bar Chart

```tsx
import React from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   Category,
   Legend,
   Tooltip,
   ColumnSeries,
} from "@syncfusion/ej2-react-charts";

const BarChart: React.FC = () => {
   const data = [
      { x: "Apple", y: 10 },
      { x: "Orange", y: 15 },
      { x: "Banana", y: 25 },
      { x: "Mango", y: 30 },
   ];

   return (
      <ChartComponent primaryXAxis={{ valueType: "Category" }}>
         <Inject services={[ColumnSeries, Legend, Tooltip, Category]} />
         <SeriesCollectionDirective>
            <SeriesDirective
               dataSource={data}
               xName="x"
               yName="y"
               type="Column"
               name="Series 1"
            />
         </SeriesCollectionDirective>
      </ChartComponent>
   );
};

export default BarChart;
```

### 3. Pie Chart

```tsx
import React from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   AccumulationChart,
   AccumulationDataLabel,
   AccumulationTooltip,
   PieSeries,
} from "@syncfusion/ej2-react-charts";

const PieChart: React.FC = () => {
   const data = [
      { x: "Category 1", y: 25 },
      { x: "Category 2", y: 15 },
      { x: "Category 3", y: 20 },
      { x: "Category 4", y: 40 },
   ];

   return (
      <ChartComponent>
         <Inject
            services={[PieSeries, AccumulationTooltip, AccumulationDataLabel]}
         />
         <SeriesCollectionDirective>
            <SeriesDirective
               dataSource={data}
               xName="x"
               yName="y"
               type="Pie"
               innerRadius="40%"
               explode={true}
               explodeOffset="10%"
            />
         </SeriesCollectionDirective>
      </ChartComponent>
   );
};

export default PieChart;
```

### 4. Area Chart

```tsx
import React from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   Category,
   Legend,
   Tooltip,
   AreaSeries,
} from "@syncfusion/ej2-react-charts";

const AreaChart: React.FC = () => {
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
         <Inject services={[AreaSeries, Legend, Tooltip, Category]} />
         <SeriesCollectionDirective>
            <SeriesDirective
               dataSource={data}
               xName="x"
               yName="y"
               type="Area"
               name="Series 1"
            />
         </SeriesCollectionDirective>
      </ChartComponent>
   );
};

export default AreaChart;
```

### 5. Scatter Chart

```tsx
import React from "react";
import {
   ChartComponent,
   SeriesCollectionDirective,
   SeriesDirective,
   Inject,
   Legend,
   Tooltip,
   ScatterSeries,
} from "@syncfusion/ej2-react-charts";

const ScatterChart: React.FC = () => {
   const data = [
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 7 },
      { x: 5, y: 11 },
      { x: 6, y: 13 },
   ];

   return (
      <ChartComponent>
         <Inject services={[ScatterSeries, Legend, Tooltip]} />
         <SeriesCollectionDirective>
            <SeriesDirective
               dataSource={data}
               xName="x"
               yName="y"
               type="Scatter"
               name="Series 1"
            />
         </SeriesCollectionDirective>
      </ChartComponent>
   );
};

export default ScatterChart;
```

### Notes:

1. **TypeScript Setup**: Make sure your Next.js project is configured to support TypeScript. Typically, you'll have TypeScript support out of the box with Next.js projects.

2. **Component Structure**: Each chart component (`LineChart`, `BarChart`, etc.) is defined as a functional component (`React.FC`). This is the preferred way in modern React to define components.

3. **Import Statements**: Ensure that you have imported necessary components (`ChartComponent`, `SeriesDirective`, `Inject`, etc.) from `'@syncfusion/ej2-react-charts'` package.

4. **Data**: Adjust the `data` variable according to your specific chart requirements. The examples provided use simple arrays of objects (`{ x: 'Label', y: value }`).

5. **Configuration**: Customize the chart configurations (like axes, legends, tooltips, etc.) as per your application needs. Syncfusion's `ej2-react-charts` provides extensive customization options documented in their official documentation.

By following these examples, you should be able to integrate Syncfusion `ej2-react-charts` into your Next.js project using TypeScript effectively.
