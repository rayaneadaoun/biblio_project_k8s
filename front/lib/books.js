
export async  function getAllBooks() {
// Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('http://'+process.env.API_URL_BACK+':9191/books');
  const books = await res.json();
  return books?.map((book) => {
    return {
      params: {
        id: book.bookId,
        name : book.name,
        category : book.category        
      }
    };
  });
}
export async  function getCommentForBooks(id) {

    const res = await fetch(`http://`+process.env.API_URL_BACK+`:9191/comments/bookId/${id}`);
    const comments = await res.json();
    // sort by value
    return comments.sort(function (a, b) {
        return b.commentId - a.commentId;
      }).map((comment) => {
      return {
        params: {
        "id": comment.commentId,
        "content": comment.content,
        "grade": comment.grade,
        "userId":comment.userId,
        "bookId": comment.bookId
        }
      };
    });
}


export async  function getUsersForBook(id) {
    const res = await fetch(`http://`+process.env.API_URL_BACK+`:9191/books/id/${id}/users`);
    const users = await res.json();
    return users?.map((user) => {
      return {
        params: {
          id : user.userId,
          name : user.name,
          email : user.email
        }
      };
    });
}


export async  function getBooksForUser(id) {
    const res = await fetch(`http://`+process.env.API_URL_BACK+`:9191/books/userId/${id}/books`);
    const books = await res.json();
    return books.map((book) => {
      return {
        params: {
          id : book.bookId,
          name : book.name,
          category : book.category
        }
      };
    });
}

export async function getBookData(id) {
  
  const res = await fetch('http://'+process.env.API_URL_BACK+':9191/books/id/'+id);
  const book = await res.json();
    return {
      params: {
       id : book.bookId,
       name : book.name,
       category : book.category
      }
  };

}

