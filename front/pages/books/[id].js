import Layout from '../../components/layout';
import { getAllBooks, getBookData , getCommentForBooks , getUsersForBook } from '../../lib/books';
import Head from 'next/head';
import Image from 'next/image';
import { bookService , userService  , commentService} from '../../services';
import Comments from '../../components/Comments'
import AddComment from '../../components/AddComment'
import Notiflix from 'notiflix';

export async function getStaticProps({ params }) {
  const bookData = await getBookData(params.id);
  const comments = await getCommentForBooks(params.id);
  const users = await getUsersForBook(params.id);


  return {
    props: {
      bookData :bookData.params ,
      comments : comments,
      users : users
    },
  };
}

export async function getStaticPaths() {
  const books =  await getAllBooks();
  const paths = books.map(book=>(
    {
      params:{
        id:book.params.id.toString()
      }
    })
  );
  return {
    paths,
    fallback: false,
  };
}
const myLoader = ({ src, width, quality }) => {
  return `https://m.media-amazon.com/images/I/51b8VHGqOxL.SR160,240_BG243,243,243.jpg`
}

const addBookToUser = ( book ,user ) => {
  let categories = ['children'];

  if(user?.age >= 13 ){
    categories.push('teen');
  }
  if(user?.age > 18 ){
    categories.push('adult');
  }
  if(!categories.includes(book.category)){
    Notiflix.Notify.failure('Vous ne pouvez pas accéder à cette catégorie');
    return;
  }
  if( !user.activeBooks  || user.activeBooks?.length < 3){
    if(!user.activeBooks ){
      user.activeBooks = [];
    }
    bookService.addToUser(book.id , user.userId)
    let toSaveBook = {
      params: {
         id : book.id,
         name : book.name,
         category : book.category
        }
    };
    Notiflix.Notify.success('Livre ajouté avec succés');  

    if(user?.inactiveBooks?.find(book1 => book1.params.id == book.id)){
        let index = 0;
        user.inactiveBooks.every(lbook =>  {  
          if(lbook.params.id == book.id){
            return false;
          }
          index++
        });

     
      user.inactiveBooks?.splice(index, 1)
    }


    return user.activeBooks.push(toSaveBook);
  }
  Notiflix.Notify.failure('Vous posséder déja 3 livres dans votre librairie');

}


const giveBack = ( book ,user ) => {
  
  let index = 0;
  user.activeBooks.every(lbook =>  {
    if(lbook.params.id == book.id){
        return false;
    }
    index++
  });
  
  user.inactiveBooks?.push( user.activeBooks[index]);
  user.activeBooks?.splice(index, 1)
  Notiflix.Notify.success('Livre rendu avec succés');
  return bookService.giveBack(book.id , user.userId)
 
}


export default function Book({bookData , comments, user = userService.userValue , users}) {

    const canBorrow  =  !user?.activeBooks?.find(book => book.params.id == bookData?.id)   ? true : false
    const canGiveBack =   user?.activeBooks?.find(book => book.params.id == bookData?.id) ? true : false ;
    const canDelete =    user?.roles?.find(role => role == "ADMIN") ? true : false ;
    const canComment  =  user?.inactiveBooks?.find(book => book.params.id == bookData?.id) ? true : false ;

  return ( 
  <Layout>
    <Head>
      <title>{bookData.name}</title>
    </Head>
    <div className="card  w-100 h-100 m-2" >
      <div className="row w-100 justify-content-between p-2">
        { canDelete && 
          <div className='col-md-1'>
            <button onClick={() => bookService.destroy(bookData.id)} className="btn btn-sm btn-outline-danger"> Supprimer</button>
          </div>
        }


        {canBorrow  &&  <div className='col-md-1'>
            <button onClick={() => addBookToUser(bookData , user)} type="button w-20" className="btn btn-sm btn-outline-success">Emprunter</button>
        </div> }


        { canGiveBack &&  <div className='col-md-1'>
            <button onClick={() => giveBack(bookData , user)} type="button w-20" className="btn btn-sm btn-outline-warning">Rendre</button>
        </div> }
        
      </div>
      
      <div className='row w-100 justify-content-center p-2'> 
        <Image
          loader={myLoader}
          className="card-img-top w-100"
          src="https://m.media-amazon.com/images/I/51b8VHGqOxL.SR160,240_BG243,243,243.jpg" // Route of the image file
          height={400}  //Desired size with correct aspect ratio
          width={250} // Desired size with correct aspect ratio
          alt="Card image book"
          quality={200}
          layout="fixed"
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{bookData.name}</h5>
        <p className="card-text text-justify">
          is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived
          not only five centuries, but also the leap into electronic 
          typesetting, remaining essentially unchanged. It was popularised
          in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing
          software like Aldus PageMaker including versions of Lorem 
          Ipsum.
        </p>
        <p className="card-text"><span   className={bookData.category == "adult"  ? "badge bg-danger" : (bookData.category == "teen" ? "badge bg-warning" : "badge bg-info")} >Categorie : {bookData.category == "adult"  ? "adulte" : (bookData.category == "teen" ? "ado" : "enfant") }</span></p>
        
          {canComment && <AddComment bookId={bookData.id}/> }
        
        
          <Comments  comments={comments}
        
     
         /> 
        
      </div>
    </div>
  </Layout>);
}


