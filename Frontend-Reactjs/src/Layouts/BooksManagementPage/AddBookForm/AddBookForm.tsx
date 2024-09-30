import React from 'react';
import { useForm } from 'react-hook-form';
import { BookFormData } from '../../../models/IBook';
import { useAddBook, useProductDatails, useUpdateBook } from '../../../Hooks/productHooks';
import Spinner from '../../../Components/spinner/Spinner';

interface AddBookFormProps {
  updatedBookId : number | null;
}

const AddBookForm: React.FC<AddBookFormProps> = ( {updatedBookId} ) => {

  const { product, isLoading} = useProductDatails(
      updatedBookId ? updatedBookId.toString() : null,
    ); 
    
    const { mutate: addBook } = useAddBook();
    const { mutate: updateBook } = useUpdateBook();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookFormData>({
    defaultValues: product,
  });

  React.useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);


  const onSubmit = (data: BookFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('description', data.description);
    formData.append('category', data.category.toUpperCase());
    formData.append('price', data.price.toString());
    formData.append('totalCopies', data.totalCopies.toString());
    formData.append('stock', data.stock.toString());
    
    if (data.bookCoverImage && data.bookCoverImage[0]) {
      formData.append('bookCoverImage', data.bookCoverImage[0]);
    }

    if (updatedBookId) {
      updateBook({ bookId: updatedBookId, formData });
    } else {
      addBook(formData);
    }
    reset();
    window.scrollTo(0, 0);
  };

  if(isLoading) return <Spinner/>

  return (
    <div className="container col-12 mt-2">
      <h2>{updatedBookId ? 'Update Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
        <div className="row mb-2">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input
              type="text"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              id="title"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="author" className="col-sm-2 col-form-label">Author</label>
          <div className="col-sm-10">
            <input
              type="text"
              className={`form-control ${errors.author ? 'is-invalid' : ''}`}
              id="author"
              {...register('author', { required: 'Author is required' })}
            />
            {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              id="description"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
          <div className="col-sm-10">
            <input
              type="text"
              className={`form-control ${errors.category ? 'is-invalid' : ''}`}
              id="category"
              {...register('category', { required: 'Category is required' })}
            />
            {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
          <div className="col-sm-10">
            <input
              type="number"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              id="price"
              {...register('price', { 
                required: 'Price is required', 
                valueAsNumber: true,
                min: { value: 0, message: 'Price must be greater than or equal to 0' }
              })}
            />
            {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="totalCopies" className="col-sm-2 col-form-label">Total Copies</label>
          <div className="col-sm-10">
            <input
              type="number"
              className={`form-control ${errors.totalCopies ? 'is-invalid' : ''}`}
              id="totalCopies"
              {...register('totalCopies', { 
                required: 'Total Copies is required', 
                valueAsNumber: true,
                min: { value: 1, message: 'Total copies must be greater than or equal to 1' }
              })}
            />
            {errors.totalCopies && <div className="invalid-feedback">{errors.totalCopies.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="stock" className="col-sm-2 col-form-label">Stock</label>
          <div className="col-sm-10">
            <input
              type="number"
              className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
              id="stock"
              {...register('stock', { 
                required: 'Stock is required', 
                valueAsNumber: true,
                min: { value: 1, message: 'Stock must be greater than or equal to 1' }
              })}
            />
            {errors.stock && <div className="invalid-feedback">{errors.stock.message}</div>}
          </div>
        </div>

        <div className="row mb-2">
          <label htmlFor="bookCoverImage" className="col-sm-2 col-form-label">Book Cover Image</label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control"
              id="bookCoverImage"
              {...register('bookCoverImage')}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-1 mb-1 w-25">
        {updatedBookId ? 'Update Book' : 'Add Book'}
          </button>
      </form>
    </div>
  );
};

export default AddBookForm;
