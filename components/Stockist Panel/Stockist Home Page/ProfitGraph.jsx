import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis ,Tooltip} from 'recharts';
// import { Tooltip} from '@mui/material';

const ProfitGraph = () => {
    const data = [
        { name: '0-500', students: 100 },
        { name: '500-1000', students: 300 },
        { name: '1000-1500', students: 400 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
        { name: '1500+', students: 40 },
      ];
      
  return (
    <div className='barchart'>
        <BarChart width={1300} height={280} data={data}>
          <Tooltip />
          <Bar dataKey="students" fill='var(--main_theme)' barSize={15} radius={10}/>
          <XAxis dataKey="name" fontSize={12} stroke='rgb(0, 0, 0)'/>
          <YAxis fontSize={12} stroke='rgb(0, 0, 0)'/>
          <CartesianGrid opacity={0}/>
        </BarChart>
    </div>
  )
}

export default ProfitGraph