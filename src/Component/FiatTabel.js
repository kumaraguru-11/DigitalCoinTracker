import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FaithTabel = () => {
  const [currency, setCurrencies] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [sort, setSort] = useState("default");
  const [show, setShow] = useState(false);
  const notify = () => toast("Deleted");
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = currency && currency.slice(itemOffset, endOffset);
  const pageCount = currency ? Math.ceil(currency.length / itemsPerPage) : "";

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % currency.length;
    setItemOffset(newOffset);
  };
  React.useEffect(() => {
    fetch(
      `https://coinranking1.p.rapidapi.com/reference-currencies?limit=${50}&types[0]=${"fiat"}`,
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
        setCurrencies(res.data.currencies);
      });
  }, []);

  const handleAscendingOrder = () => {
    const sortedData = currency.sort((a, b) => {
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
    setCurrencies([...sortedData]);
  };
  const handleDecendingOrder = () => {
    const sortedData = currency.sort((a, b) => {
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
    setCurrencies([...sortedData]);
  };

  const handlecheck = (event, uuid) => {
    let updatedItems = currency.map((el) => {
      if (el.uuid === uuid) {
        return { ...el, checked: event.target.checked };
      }
      return el;
    });
    setCurrencies(updatedItems);
    if (updatedItems.some((el) => el.checked === true)) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleDelete = () => {
    const filtereditems = currency.filter((e) => !e.checked);
    setCurrencies(filtereditems);
    notify()
  };

  const handleSort = () => {
    if (sort === "default") {
      handleAscendingOrder();
      setSort("ascending");
    } else if (sort === "ascending") {
      handleDecendingOrder();
      setSort("decending");
    } else {
      setSort("default");
    }
  };
  return (
    <>
      {currency ? (
        <div className="market-container">
          <h1 className="market-header">
            Fiat Refrence Currency
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
                    onClick={() => handleSort()}
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
                  currentItems.map((el, id) => (
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
        ""
      )}
    </>
  );
};

export default FaithTabel;
