import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from '../components';

import { userService } from '../services';

export default Register;

function Register() {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Nom d'utilisateur est obligatoire"),
        password: Yup.string().required('Password est obligatoire'),
        name: Yup.string().required('Le nom est obligatoire'),
        email: Yup.string().required("L'email est obligatoire"),
        age: Yup.string().required("L'age est obligatoire"),
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, setError, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ username, password , name , email, age }) {
        return userService.register(username, password , name , email, age)
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
        <div className="col-md-6 offset-md-3 mt-5">
            <div className="card">
                <h4 className="card-header">S'inscrire</h4>
                <div className="card-body col">
                    <div className="row">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>Username</label>
                                <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Nom</label>
                                <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.name?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input name="age" type="number" {...register('age')} className={`form-control ${errors.age ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.age?.message}</div>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div className="row justify-content-center m-1">
                                <button disabled={formState.isSubmitting} className="btn btn-primary">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    S'inscrire
                                </button>
                            </div>
                            {errors.apiError &&
                                <div className="alert alert-danger mt-3 mb-0">{errors.apiError?.message}</div>
                            }
                        </form>
                    </div>
                    <div className="row w-100 justify-content-center">
                        <Link href={`/login`}>
                                 Se connecter
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
