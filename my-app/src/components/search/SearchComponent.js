// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchComponent = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [results, setResults] = useState([]);

//     const handleSearch = async () => {
//         try {
//             const res = await axios.get('http://localhost:4000/project-api/search', {
//                 params: { query: searchTerm }
//             });
//             setResults(res.data.payload);
//         } catch (error) {
//             console.error("Error fetching search results:", error);
//         }
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <input
//                 type="text"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
//             />
//             <button onClick={handleSearch} style={{ padding: '10px' }}>
//                 Search
//             </button>
//             <div>
//         <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3' style={{ height: '80vh', overflow: 'auto' }} >
//         {results && results.length > 0 ? (
//         results.map((project) => (
//         <div className='col' key={project.projectId}>
//             <div className='card h-300'>
//                 <div className='card-body'>
//                     <h5 className='card-title'>Title: {project.title}</h5>
//                     <h6 className='card-subtitle'>Category: {project.category}</h6>
//                     <h6 className='card-subtitle'>Domain: {project.domain}</h6>
//                     <p className='card-text'>{project.content.substring(0, 80) + " ..."}</p>
//                 </div>
//                 <button ><span>Read More</span></button>
//             </div>
//         </div>
//     ))):(<li style={{ padding: '10px' }}>No results found</li>)}
//         </div>
//     </div>
  
            
//         </div>
//     );
// };

// export default SearchComponent;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');
        if (query) {
            setSearchTerm(query);
            handleSearch(query);
        }
    }, [location.search]);

    const handleSearch = async (query) => {
        try {
            const res = await axios.get('http://localhost:4000/project-api/search', {
                params: { query: query }
            });
            setResults(res.data.payload);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            {/* <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
            /> */}
            {/* <button onClick={() => handleSearch(searchTerm)} style={{ padding: '10px' }}>
                Search
            </button> */}
            <div>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3' style={{ height: '80vh', overflow: 'auto' }} >
                    {results && results.length > 0 ? (
                        results.map((project) => (
                            <div className='col' key={project.projectId}>
                                <div className='card h-300'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>Title: {project.title}</h5>
                                        <h6 className='card-subtitle'>Category: {project.category}</h6>
                                        <h6 className='card-subtitle'>Domain: {project.domain}</h6>
                                        <p className='card-text'>{project.content.substring(0, 80) + " ..."}</p>
                                    </div>
                                    <button ><span>Read More</span></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <li style={{ padding: '10px' }}>No results found</li>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
