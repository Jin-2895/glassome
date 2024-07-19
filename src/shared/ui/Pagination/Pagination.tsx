import React, { FC } from "react";
import ReactPagination, { ReactPaginateProps } from "react-paginate";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface PaginationProps extends ReactPaginateProps {}

const Pagination: FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  initialPage,
  ...rest
}) => {
  return (
    <div className="flex flex-row justify-center mt-10">
      <ReactPagination
        pageCount={pageCount}
        onPageChange={onPageChange}
        initialPage={initialPage}
        containerClassName="block flex flex-row justify-center w-full"
        pageLinkClassName="text-black mx-3"
        activeLinkClassName="text-burgundy border-b-2 border-burgundy"
        previousLinkClassName="text-black"
        nextLinkClassName="text-black"
        previousLabel={pageCount > 1 ? <BsArrowLeft size={30} /> : null}
        nextLabel={pageCount > 1 ? <BsArrowRight size={30} /> : null}
        {...rest}
      />
    </div>
  );
};

export { Pagination };
