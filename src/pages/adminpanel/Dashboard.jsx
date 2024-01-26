import React, { useEffect, useState } from 'react'
// import { BarChart } from '@mui/x-charts/BarChart';
import { Chart } from "react-google-charts";
function Dashboard() {
  const [AdminDetails, setAdminDetails] = useState({});
  useEffect(() => {
    
  }, []);

  const data = [
    ["Year", "payments", "courses", "users"],
    // ["2014", 1, 1, 1],
    // ["2015", 1, 1, 1],
    ["2023", 0, 0, 0],
    ["2024", 0, 0, 3],
  ];

  const options = {
    chart: {
      title: "Luxeminds Performance",
      subtitle: "Total purchase , users , courses",
    },
  };
  return (
    <div className='mx-10 my-10'>

        <Chart
          chartType="Bar"
          data={data}
           options={options}
          width="100%"
          height="400px"
          legendToggle
        />
    </div>  
  )
} 

export default Dashboard
