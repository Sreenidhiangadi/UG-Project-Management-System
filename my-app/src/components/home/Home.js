


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Home = () => {
//   const [projects, setProjects] = useState([]);

//   const fetchProjects = async () => {
//     const response = await axios.get('/project-api/projects');
//     console.log(response)
//     setProjects(response.data.payload);
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const data = {
//     labels: projects.map(project => project.name),
//     datasets: [
//       {
//         label: 'Project Data',
//         data: projects.map(project => project.value), // Assuming `value` is a numeric field in your projects
//         backgroundColor: 'rgba(75, 192, 192, 0.4)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

 

//   return (
//     <div  style={{ height: '80vh', overflow: 'auto' }}>
//       <h2>Project Chart</h2>
//       <Bar data={data} options={options} />
      
      
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Added for Pie Chart
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, // Added for Pie Chart
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const response = await axios.get('/project-api/projects');
    console.log(response)
    setProjects(response.data.payload);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const publishedProjects = projects.filter(project => project.published).length;
  const unpublishedProjects = projects.filter(project => !project.published).length;

  
  const categories = {};
  projects.forEach(project => {
    if (!categories[project.category]) {
      categories[project.category] = { total: 0, published: 0, unpublished: 0 };
    }
    categories[project.category].total += 1;
    if (project.published) {
      categories[project.category].published += 1;
    } else {
      categories[project.category].unpublished += 1;
    }
  });
  const barData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Total Projects',
        data: Object.values(categories).map(cat => cat.total),
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieData = {
    labels: ['Published', 'Not Published'],
    datasets: [
      {
        data: [publishedProjects, unpublishedProjects],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(192, 75, 75, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(192, 75, 75, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ height: '80vh', overflow: 'auto' }}>
      <h2>Projects by Category</h2>
         <Bar data={barData} options={barOptions} />
      <div className="pie-chart-container">
      <h2>Project Publication Status</h2>
      <Pie data={pieData} />
      </div>
      
    </div>
  );
};

export default Home;
