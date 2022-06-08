import Image from 'next/image';
import Link from 'next/link';

const myLoader = ({ src, width, quality }) => {
  return `https://m.media-amazon.com/images/I/51b8VHGqOxL.SR160,240_BG243,243,243.jpg`
}
// col-lg-3 col-md-6 col-sm-12

const BookCard = ({book}) => {
   return (
    <div className="card   col-lg-2 col-md-6 col-sm-6 m-2 bg-card" >
        <div className='row justify-content-start'>
            <p className="col-2 align-self-start"><span   className={book.category == "adult"  ? "badge bg-danger" : (book.category == "teen" ? "badge bg-warning" : "badge bg-info")} >Categorie : {book.category == "adult"  ? "adulte" : (book.category == "teen" ? "ado" : "enfant") }</span></p>
        </div>
        
        <div className='row justify-content-between'>
          <h5 className="col-12 card-title text-center p-2">{book.name}</h5>
        </div>
        <div className='row justify-content-center'>
          <Image 
              loader={myLoader}
              className="card-img-top  col-auto text-center"
              src="https://m.media-amazon.com/images/I/51b8VHGqOxL.SR160,240_BG243,243,243.jpg" // Route of the image file
              height={350}  //Desired size with correct aspect ratio
              width={220} // Desired size with correct aspect ratio
              alt="Card image book"
              quality={200}
              layout="fixed"
            /> 
        </div>
        <div className="card-body">
          <div className="row justify-content-center">
            <div className='col-4'>
              <Link href={`/books/${book.id}`}>
                <a href="#" className="btn btn-sm btn-outline-primary">+ d'infos</a>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}
export default BookCard;