import { Fragment } from 'react'

const Comments  = ({ comments = [] })  => 

{
  return (
    <Fragment>
        <h3 className="mt-2">Commentaires:</h3>
        <div className='row w-100 m-1'>
            {comments?.map((comment) => (
            <div key={comment.params.id} className="card m-2">
                <div className="card-header w-100">
                    { comment.params.grade < 3  && <span className='text-danger'>{comment.params.grade}/5</span> }
                    { comment.params.grade == 3  && <span className='text-warning'>{comment.params.grade}/5</span> }
                    { comment.params.grade > 3   && <span className='text-success'>{comment.params.grade}/5</span> }
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                    <p>{comment.params.content}</p>
                    <footer className="blockquote-footer">Commentaire de<cite title="Source Title"> Jack Durant</cite></footer>
                    </blockquote>
                </div>
            </div>
            ))}
        </div>
    </Fragment>
  )
}

export default Comments;