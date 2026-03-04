import ReactPagination from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number; 
  currentPage: number; 
  onPageChange: (page: number) => void; 
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPagination
      pageCount={totalPages}
      pageRangeDisplayed={5} 
      marginPagesDisplayed={1} 
      onPageChange={({ selected }) => onPageChange(selected + 1)} 
      forcePage={currentPage - 1} 
      containerClassName={css.pagination} 
      activeClassName={css.active} 
      nextLabel="→"
      previousLabel="←"
    />
  );
}
