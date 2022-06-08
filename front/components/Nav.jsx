import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { NavLink } from '.';
import { userService , bookService } from '../services';
import { Link } from './Link';

export { Nav };

function Nav() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

     // form validation rules 
     const validationSchema = Yup.object().shape({
        searchName: Yup.string().required("Nom d'utilisateur est obligatoire"),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, setError, formState } = useForm(formOptions);

    function logout() {
        userService.logout();
    }

    function onSubmit({ searchName }) {
            return bookService.searchByName(searchName).then((res) => {
                router.push(`/books/${res.data.bookId}`);

            }).catch(error => {
                    setError('apiError', { message: error });
            });
    }
    // only show nav when logged in
    if (!user) return null;
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <NavLink href="/" exact className="navbar-brand">Projet Biblio</NavLink>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="/books/list" exact className="nav-item nav-link">Bilbiotheque</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="/books/add" exact className="nav-item nav-link">Ajouter un livre</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="/profile/me/" exact className=" nav-item nav-link align-self-end">Profil</NavLink>
                            </li>
                        </ul>
                        <form onSubmit={handleSubmit(onSubmit)} className="d-flex" >
                            <input className="form-control me-2" type="search" name="searchName"  {...register('searchName')} placeholder="Rechercher" aria-label="Search"></input>
                            <button className="btn btn-outline-success" type="submit">Chercher</button>
                        </form>
                    </div>
            </div>
        </nav>
    );
}