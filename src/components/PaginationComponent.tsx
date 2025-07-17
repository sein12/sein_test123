import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={`${
              currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink href="#" onClick={(e) => e.preventDefault()}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={`${
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
