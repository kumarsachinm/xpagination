import "./App.css";

import React, { useState, useEffect } from "react";

const PaginatedTable = () => {
  const [data, setData] = useState([]); // State for data
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // total number of pages
  const [itemsPerPage] = useState(10); // Items per page (10)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try{
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = await response.json();
      setTotalPages(Math.ceil(result.length / itemsPerPage)); // calculate total pages
      setData(result); // Store the fetched data
      setLoading(false);
    } catch(error){
      console.error("failed to fetch data", error);
      alert("failed to fetch data");
    }
    };

    fetchData();
  }, []);

  // Get current data based on the pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle next page
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Loading Spinner
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="buttonItems">
        <button onClick={handlePrevious} >
          Previous
        </button>
        <button>{currentPage}</button>
        <button onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTable;
