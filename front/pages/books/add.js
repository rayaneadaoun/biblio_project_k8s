import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Head from 'next/head';
import Layout from '../../components/layout';

import { bookService } from '../../services';

export default AddBook;

function AddBook() {
    const router = useRouter();


    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Le nom est obligatoire"),
        category: Yup.string().required('La category est obligatoire')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ name, category }) {
        return bookService.store(name, category)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/books/list';

                router.push(returnUrl);
            })
            .catch(error => {
                setError('apiError', { message: error });
            });
    }

    return (
        <Layout>
            <div className="col-md-6 offset-md-3 mt-5">
                <Head>
                    <title>Ajouter un livre</title>
                </Head>
                <div className="card">
                    <h4 className="card-header">Ajouter un livre</h4>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Nom du livre</label>
                                <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.name?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Categorie</label>
                                <select name="category" {...register('category')} className={`form-control ${errors.category ? 'is-invalid' : ''}`}>
                                    <option value="children">Enfant</option>
                                    <option value="teen">Ado</option>
                                    <option value="adult">Adulte</option>
                                </select>
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div className="row justify-content-center m-1">
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
        </Layout>
    );
}
