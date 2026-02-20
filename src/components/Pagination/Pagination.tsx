import ReactPagination from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number; // Загальна кількість сторінок
  currentPage: number; // Поточна активна сторінка
  onPageChange: (page: number) => void; // Функція, що спрацьовує при кліку на сторінку
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPagination
      pageCount={totalPages}
      pageRangeDisplayed={5} // Скільки кнопок сторінок показувати посередині
      marginPagesDisplayed={1} // Скільки кнопок показувати по краях (наприклад, 1 ... 4 5 6 ... 10)
      onPageChange={({ selected }) => onPageChange(selected + 1)} // react-paginate рахує з 0, тому додаємо 1
      forcePage={currentPage - 1} // Вказуємо активну сторінку (знову ж таки, мінус 1 через відлік з нуля)
      containerClassName={css.pagination} // Клас для <ul>
      activeClassName={css.active} // Клас для активної <li>
      nextLabel="→"
      previousLabel="←"
    />
  );
}