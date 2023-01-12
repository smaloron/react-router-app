import useAxios from 'axios-hooks';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import conf from '../config';
export default function TaskList () {
    const [{ data, loading, error }, reload] = useAxios(conf.url);

    useEffect(() => {
        reload();
    }, []);

    if (loading) return <p>Chargement en cours</p>

    if (error) return <div><h2>Erreur</h2><p>{error}</p></div>

    function getTasks () {
        return data.map((task) => {
            return (
                <div key={task.id}>
                    <h3>{task.taskName}</h3>
                    <Link to={'/details/' + task.id}>En savoir plus</Link>
                </div>
            )
        });
    }


    return (
        <div>
            <h1>Liste des tâches</h1>
            <Link to="/new">Ajouter une tâche</Link>
            {getTasks()}
        </div>
    )
}