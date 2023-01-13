import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import conf from '../config';

export default function TaskDetails () {
    const { id } = useParams();
    const URL = conf.url + id;
    const navigate = useNavigate();

    const [{ data, loading, error }, refetch] = useAxios(URL);

    const [, executeDelete] = useAxios(
        { url: URL, method: 'DELETE' }, { manual: true }
    );

    useEffect(() => {
        refetch()
    }, [])

    if (loading) return <p>Chargement en cours</p>

    if (error) return <div><h2>Erreur</h2><p>{error}</p></div>

    function deleteTask () {
        if (confirm('Voulez-vous supprimer ?')) {
            executeDelete()
                .then(() => navigate('/'))
                .catch((err) => console.log(err));
        }
    }

    return (
        <div >
            <Link to="/">Retour</Link>
            <h3 style={{ background: data.done ? 'green' : 'red' }}>{data.taskName}</h3>
            <p>{data.description}</p>

            <Link to={'/update/' + data.id}>Modifier</Link>

            <button onClick={deleteTask}>Supprimer</button>
        </div>
    )
}