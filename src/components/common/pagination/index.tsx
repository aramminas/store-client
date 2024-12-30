import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import "./styles.scss";

type PaginationProps = {
  itemsPerPage: number;
  total: number;
  defaultSelectedPage: number;
  setOffset: Dispatch<SetStateAction<number>>;
};

export const Pagination: FC<PaginationProps> = ({
  total,
  setOffset,
  itemsPerPage,
  defaultSelectedPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageCount = Math.ceil(total / itemsPerPage);

  useEffect(() => {
    const currentPage = searchParams.get("page");

    if (!currentPage) {
      setSearchParams((prev) => {
        prev.set("page", "1");
        return prev;
      });
    }

    if (itemsPerPage) {
      setSearchParams((prev) => {
        prev.set("limit", String(itemsPerPage));
        return prev;
      });
    }
  }, [itemsPerPage]);

  const handlePageClick: ReactPaginateProps["onClick"] = (event) => {
    const newOffset = (event.selected * itemsPerPage) % total;
    const selectedPage = String(event.selected + 1);

    setOffset(newOffset);
    setSearchParams((prev) => {
      prev.set("page", selectedPage);
      return prev;
    });
  };

  return (
    <ReactPaginate
      className="pagination-content"
      breakLabel="..."
      forcePage={defaultSelectedPage}
      nextLabel={<BiSolidRightArrow />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel={<BiSolidLeftArrow />}
      renderOnZeroPageCount={null}
    />
  );
};
