import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import Loader from "../Component/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Refrencecurrencytabel = () => {
  const [refrencecurrency, setRefrenceCurrency] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [sort, setSort] = useState("default");
  const [show, setShow] = useState(false);
  const notify = () => toast("Deleted");
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems =
    refrencecurrency && refrencecurrency.slice(itemOffset, endOffset);
  const pageCount = refrencecurrency
    ? Math.ceil(refrencecurrency.length / itemsPerPage)
    : "";

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % refrencecurrency.length;
    setItemOffset(newOffset);
  };
  React.useEffect(() => {
    fetch(
      `https://coinranking1.p.rapidapi.com/reference-currencies?limit=${50}&types[0]=${"coin"}`,
      {
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "b0e5fdedf1msh31670962ccd7408p140db3jsne4f802e641e3",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      }
    )
      .then((resp) => resp.json())
      .then((res) => {
        setRefrenceCurrency(res.data.currencies);
      });
  }, []);

  const handlecheck = (event, uuid) => {
    const updatedItems = refrencecurrency.map((el) => {
      if (el.uuid === uuid) {
        return { ...el, checked: event.target.checked };
      }
      return el;
    });
    setRefrenceCurrency(updatedItems);

    if (updatedItems.some((el) => el.checked === true)) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleDelete = () => {
    const filteredItems = refrencecurrency.filter((el) => !el.checked);
    setRefrenceCurrency(filteredItems);
    notify();
  };

  const handleAscendingOrder = () => {
    const sortedData = refrencecurrency.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    setRefrenceCurrency([...sortedData]);
  };
  const handleDecendingOrder = () => {
    const sortedData = refrencecurrency.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    setRefrenceCurrency([...sortedData]);
  };

  const handleSorting = () => {
    if (sort === "default") {
      handleAscendingOrder();
      setSort("ascending");
    } else if (sort === "ascending") {
      handleDecendingOrder();
      setSort("decending");
    } else if (sort === "decending") {
      setSort("default");
    }
  };
  return (
    <>
      {refrencecurrency ? (
        <div className="market-container">
          <h1 className="market-header">
            Coin Refrence Currency
            {show && (
              <span className="delete-icon">
                <i
                  className="bi bi-trash3-fill"
                  onClick={() => handleDelete()}
                ></i>
              </span>
            )}
          </h1>
          <div className="market-table-wrapper">
            <table className="market-table">
              <thead className="market-table-thead">
                <tr>
                  <th className="tabel-thead-head radius-start text-start">
                    #
                  </th>
                  <th className="tabel-thead-head">Avatar</th>
                  <th
                    className="tabel-thead-head th-textalign-start click"
                    onClick={() => handleSorting()}
                  >
                    Name
                    <span className="td-name-icons">
                      {sort === "default" ? (
                        <i className="bi bi-sort-alpha-up"></i>
                      ) : sort === "ascending" ? (
                        <i className="bi bi-sort-alpha-up-alt"></i>
                      ) : (
                        <i className="bi bi-filter"></i>
                      )}
                    </span>
                  </th>
                  <th className="tabel-thead-head">Symbol</th>
                  <th className="tabel-thead-head">Sign</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((el) => (
                    <tr className="tbody-tr" key={el.uuid}>
                      <td className="tbody-tr-td text-start">
                        <div>
                          <input
                            type="checkbox"
                            style={{ width: "20px", height: "20px" }}
                            onClick={(a) => handlecheck(a, el.uuid)}
                          />
                        </div>
                      </td>
                      <td className="tbody-tr-td">
                        <span className="tbody-avatar">
                          <img
                            src={el.iconUrl}
                            alt={el.name}
                            className="tbody-avatar-img"
                          />
                        </span>
                      </td>
                      <td
                        className="tbody-tr-td td-name"
                        style={{
                          backgroundColor:
                            sort !== "default" ? " rgb(243, 242, 242)" : "",
                        }}
                      >
                        {el.name}
                      </td>
                      <td className="tbody-tr-td">{el.symbol}</td>
                      <td className="tbody-tr-td">
                        {el.sign ? el.sign : "--"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
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
          />
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Refrencecurrencytabel;
