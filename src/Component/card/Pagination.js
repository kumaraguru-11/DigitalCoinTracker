import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { useLocation } from "react-router-dom";
import { fetchCoins } from "../../Slice/CoinsSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.coins.coins.data);
  React.useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data && data.coins.slice(itemOffset, endOffset);
  const pageCount = data ? Math.ceil(data.coins.length / itemsPerPage) : "";
  const location = useLocation();

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.coins.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Card currentItems={currentItems} />
      {location.pathname !== "/" && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(pageCount)}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      )}
    </>
  );
};

export default Pagination;
