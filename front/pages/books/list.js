import Layout from '../../components/layout';
import { getAllBooks, getBookData } from '../../lib/books';
import BookCard from '../../components/Book';
import Head from 'next/head';



export const getStaticProps = async () => {
  const listBooksData =  await getAllBooks();
  return {
    props: {
        books: listBooksData
    },
  };
}

const Books = ({books}) => {
    return (
    <Layout >
      <Head>
          <title>Nos livres</title>
      </Head>
      <div className="row w-100 h-100 justify-content-center" >
        {books.map(book=>
        <BookCard  key={book.params.id} book={book.params}/>
        )}
      </div>
    </Layout>
    
    );
}
export default Books;

