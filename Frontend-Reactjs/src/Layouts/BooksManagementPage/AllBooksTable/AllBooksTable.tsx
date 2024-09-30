import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useDeleteBook, useProducts } from '../../../Hooks/productHooks';
import Spinner from '../../../Components/spinner/Spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  bookCover?: string;
}

interface AllBooksProps {
  setActiveTab: (tab: string) => void;
  setUpdatedBookId: (tab: number) => void;
}

const AllBooksTable: React.FC<AllBooksProps> = ({setActiveTab,setUpdatedBookId}) => {
  const { products: books, error, isLoading } = useProducts();

  const { mutate: deleteBook } = useDeleteBook();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    author: '',
    category: '',
    maxPrice: '',
    maxStock: '',
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; bookId: number | null }>({
    isOpen: false,
    bookId: null,
  });

  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const tableElement = tableRef.current;
      const headerElement = headerRef.current;
      if (tableElement && headerElement) {
        const { top } = tableElement.getBoundingClientRect();
        headerElement.style.transform = `translateY(${Math.max(0, -top)}px)`;
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleDeleteClick = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setDeleteConfirmation({ isOpen: true, bookId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.bookId) {
      deleteBook(deleteConfirmation.bookId);
      setDeleteConfirmation({ isOpen: false, bookId: null });
    }
  };

  const handleUpdateBook = (bookId:number,event: React.MouseEvent) => {
    event.stopPropagation();
    setUpdatedBookId(bookId);
    setActiveTab("addBook");
  };

  const handleCancelDelete = () => {
    setDeleteConfirmation({ isOpen: false, bookId: null });
  };

  const handleRowClick = (id: number) => {
    navigate(`/book/${id}`);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredBooks = useMemo(() => {
    return books?.filter((book: Book) => {
      return (
        (filters?.author === '' || book?.author === filters?.author) &&
        (filters?.category === '' || book?.category === filters?.category) &&
        (filters?.maxPrice === '' || book?.price <= Number(filters?.maxPrice)) &&
        (filters?.maxStock === '' || book?.stock <= Number(filters?.maxStock))
      );
    });
  }, [books, filters]);

  const uniqueAuthors = useMemo(() => [...new Set(books?.map((book: Book) => book.author))], [books]);
  const uniqueCategories = useMemo(() => [...new Set(books?.map((book: Book) => book.category))], [books]);

  if (isLoading) return <Spinner />;
  if (error) {
    toast.error(error.message);
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-1 col-12 mb-1">
      <h2 className='mt-2'>All Books</h2>
      <div 
        ref={tableRef}
        className="table-responsive" 
        style={{ 
          maxHeight: '65vh', 
          overflowY: 'auto',
          position: 'relative'
        }}
      >
        <table className="table table-striped table-hover">
          <thead ref={headerRef} style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>
                Author
                <select
                  className="form-select form-select-sm d-inline-block w-auto ms-2"
                  value={filters.author}
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueAuthors.map((author) => (
                    <option key={author} value={author}>{author}</option>
                  ))}
                </select>
              </th>
              <th>
                Category
                <select
                  className="form-select form-select-sm d-inline-block w-auto ms-2"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </th>
              <th>
                Price ≤
                <input
                  type="number"
                  className="form-control form-control-sm d-inline-block ms-2"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  style={{ width: '70px' }}
                />
              </th>
              <th>
                Stock ≤
                <input
                  type="number"
                  className="form-control form-control-sm d-inline-block ms-2"
                  placeholder="Max"
                  value={filters.maxStock}
                  onChange={(e) => handleFilterChange('maxStock', e.target.value)}
                  style={{ width: '70px' }}
                />
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book: Book) => (
              <tr key={book.id} className='text-center' onClick={() => handleRowClick(book.id)} style={{ cursor: 'pointer' }}>
                <td>
                  <img src={book.bookCover} alt={book.title} style={{ width: '50px', height: '75px', objectFit: 'cover' }} />
                </td>
                <td className="align-middle">{book.title}</td>
                <td className="align-middle">{book.author}</td>
                <td className="align-middle">{book.category}</td>
                <td className="align-middle">${book.price.toFixed(2)}</td>
                <td className="align-middle">{book.stock}</td>
                <td className="align-middle">
                  <button 
                      className="btn fs-6 me-3" 
                      onClick={(e) => handleDeleteClick(book.id, e)}
                      style={{ background: 'none', border: 'none', padding: 0 }}
                    >
                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red', fontSize: '1.2em' }} />
                  </button>
                  <button 
                      className="btn fs-6" 
                      onClick={(e) => handleUpdateBook(book.id, e)}
                      style={{ background: 'none', border: 'none', padding: 0 }}
                    >
                      <FontAwesomeIcon icon={faPen} style={{ color: 'blue', fontSize: '1.2em' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteConfirmation.isOpen && (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="close" onClick={handleCancelDelete}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this book?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooksTable;