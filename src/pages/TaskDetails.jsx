import useAxios from 'axios-hooks';
import { Link, useParams } from 'react-router-dom';
import conf from '../config';

export default function TaskDetails () {
    const { id } = useParams();
    const [{ data, loading, error }] = useAxios(conf.url + id);

    if (loading) return <p>Chargement en cours</p>

    if (error) return <div><h2>Erreur</h2><p>{error}</p></div>

    return (
        <div >
            <Link to="/">Retour</Link>
            <h3 style={{ background: data.done ? 'green' : 'red' }}>{data.taskName}</h3>
            <p>{data.description}</p>

            <Link to={'/update/' + data.id}>Modifier</Link>
        </div>
    )
}