import React, { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { UseContext } from "../Context/UseContext";
import Card from "./Card";
import { useLocation } from "react-router-dom";

const Pagination = () => {
  const { data } = useContext(UseContext);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data && data.slice(itemOffset, endOffset);
  const pageCount = data ? Math.ceil(data.length / itemsPerPage) : "";
  const location = useLocation();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Card currentItems={currentItems} />
      {location.pathname!=='/'&&<ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />}
    </>
  );
};

export default Pagination;
