import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import GeneralTable from '../../../components/GeneralTable';
const Report = () => {
    const chartRef = useRef(null);
    const data = [
        {
          id: 1,
          roomType: "Phòng Deluxe",
          cluster: 0,
          totalBookings: "15",
          totalRevenue: "150000000"
        },
        {
          id: 2,
          roomType: "Phòng Superior",
          cluster: 0,
          totalBookings: "10",
          totalRevenue: "90000000"
        },
        {
          id: 3,
          roomType: "Phòng Standard",
          cluster: 1,
          totalBookings: "8",
          totalRevenue: "60000000"
        },
        {
          id: 4,
          roomType: "Phòng Suite",
          cluster: 1,
          totalBookings: "5",
          totalRevenue: "80000000"
        }
      ];
      
      const columns = [
        { key: "id", label: "Mã loại phòng" },
        { key: "roomType", label: "Tên loại phòng" },

        { key: "totalRevenue", label: "Tổng doanh thu (VNĐ)" }
      ];
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Dữ liệu giả: Loại phòng và doanh thu (triệu VNĐ)
    const data = {
      labels: ['Phòng Deluxe', 'Phòng Superior', 'Phòng Standard', 'Phòng Suite', 'Phòng Family'],
      datasets: [
        {
          label: 'Tổng doanh thu theo loại phòng',
          data: [500, 300, 150, 200, 100], // doanh thu theo loại phòng
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
        }
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Báo cáo doanh thu theo loại phòng',
          font: {
            size: 18,
          },
        },
      },
    };

    const pieChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });

    return () => {
      pieChart.destroy();
    };
  }, []);
    return (
        <div className='flex w-full item-center mt-20'>
        <div className='p-4 mt-40'>
          <canvas ref={chartRef}></canvas>
        </div>
        <div className='w-4/5'>
        <GeneralTable
      
      datas={data}
      columns={columns}
    />
        </div>
      </div>
    );
};

export default Report;