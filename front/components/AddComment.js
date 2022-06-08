import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { commentService  , bookService , userService} from '../services';
import Notiflix from 'notiflix';

export default AddComment;

function  AddComment({ bookId})
{

    const router = useRouter();



    // form validation rules 
    const validationSchema = Yup.object().shape({
        content: Yup.string().required("Le contenue est obligatoire"),
        grade: Yup.string().required('La note est obligatoire')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ content,grade }) {
        Notiflix.Notify.success('Commentaire ajouté avec succés');
        return commentService.store(content,grade , userService.userValue.userId , bookId)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl ='/books/'+bookId;
             
                router.push(returnUrl);
            })
            .catch(error => {
                Notiflix.Notify.failure("Erreur dans l'ajout du commentaire");
                setError('apiError', { message: error });
            });
    }
    return ( 
        <div className="row  w-100">
            <div className="card w-100">
                <h4 className="card-header w-100">Ajouter un commentaire</h4>
                <div className="card-body w-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group row w-100">
                            <div className="col-2">
                                <span>Note : </span>
                            </div>
                            <div className="col-10">
                                <select name="grade" {...register('grade')} className={`form-control w-100 ${errors.grade ? 'is-invalid' : ''}`}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="form-group w-100 mt-2">
                            <textarea  placeholder="Votre commentaire" name="content" rows="5" cols="33"  {...register('content')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}>
                            </textarea>
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        
                        <div className="row justify-content-center m-1 mt-3">
                            <button disabled={formState.isSubmitting} className="btn btn-primary">
                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Ajouter
                            </button>
                        </div>
                        {errors.apiError &&
                            <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}   

