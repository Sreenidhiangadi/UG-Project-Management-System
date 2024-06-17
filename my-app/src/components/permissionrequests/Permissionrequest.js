// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { axiosWithToken } from '../../axiosWithToken';

// const Permissionrequest = () => {
//   const [requests, setRequests] = useState([]);
//   const { currentUser } = useSelector(state => state.studentTeacher);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       const res = await axiosWithToken.get(`http://localhost:4000/teacher-api/requests/${currentUser.userId}`);
//       console.log(res)
//       setRequests(res.data.requests);
//     };

//     fetchRequests();
//   }, [currentUser.userId]);

//   const respondToRequest = async (studentId, response) => {
//     console.log(studentId)
//     console.log(response)
//     const requestData = {
//       teacherId: currentUser.userId,
//       studentId,
//       response
//     };
//     const res=await axiosWithToken.put('http://localhost:4000/teacher-api/request',requestData)
//   };

//   return (
//     <div>
//       <h1>Permission Requests</h1>
//       <ul>
//         {requests.map(req => (
//           <li key={req.studentId}>
//             {req.studentName} ({req.studentId})
//             <button onClick={() => respondToRequest(req.studentId, 'accept')}>Accept</button>
//             <button onClick={() => respondToRequest(req.studentId, 'deny')}>Deny</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Permissionrequest;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosWithToken } from '../../axiosWithToken';

const Permissionrequest = () => {
  const [requests, setRequests] = useState([]);
  const { currentUser } = useSelector(state => state.studentTeacher);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axiosWithToken.get(`http://localhost:4000/teacher-api/requests/${currentUser.userId}`);
      setRequests(res.data.requests);
    };

    fetchRequests();
  }, [currentUser.userId]);

  const respondToRequest = async (studentId, response) => {
    const requestData = {
      teacherId: currentUser.userId,
      studentId,
      response
    };
    try {
      const res = await axiosWithToken.put('http://localhost:4000/teacher-api/request', requestData);
      console.log(res)
      // Update local storage if the request is successful
      
        // Remove the responded request from the list
        setRequests(requests.filter(req => req.studentId !== studentId));
        
        // Get current user from local storage
        
        // Update local storage with updated data
        
      
      localStorage.setItem('user', JSON.stringify(res.data.updatedTeacher));
    } catch (error) {
      // Handle errors if necessary
    }
  };

  return (
    <div>
      <h1>Permission Requests</h1>
      <ul>
        {requests.map(req => (
          <li key={req.studentId}>
            {req.studentName} ({req.studentId})
            <button onClick={() => respondToRequest(req.studentId, 'accept')}>Accept</button>
            <button onClick={() => respondToRequest(req.studentId, 'deny')}>Deny</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Permissionrequest;
