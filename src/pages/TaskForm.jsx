import { Formik, useFormik } from 'formik'
import useAxios from 'axios-hooks';
import conf from '../config';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default function TaskForm () {

    const { id } = useParams();
    const navigate = useNavigate();
    const URL = conf.url + (id ? id : '');

    const [{ data, loading, error }, saveTask] = useAxios(
        { url: URL, method: id ? 'PUT' : 'POST' }, { manual: true });

    const [{ data: task, loading: taskLoading, error: taskError }, getTask] = useAxios(
        { url: URL, method: 'GET' }, { manual: true }
    );

    useEffect(() => {
        if (id) {
            getTask().then(response => formik.setValues(response.data));
        }
    }, []);

    const validate = (values) => {
        const errors = {};
        if (!values.taskName) {
            errors.taskName = 'Le nom de la tâche est obligatoire';
        }

        if (!values.dueDate) {
            errors.dueDate = 'Une tâche doit avoir une date butoir'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            taskName: 'aaa',
            dueDate: '',
            description: 'test',
            done: false
        },
        validate,
        onSubmit: (values) => {
            saveTask({ data: values }).then(() => navigate("/"));
        }
    });

    const showError = (fieldName) => {
        if (formik.errors[fieldName]) {
            return <p>{formik.errors[fieldName]}</p>
        } else {
            return ''
        }
    }


    return (
        <div>
            <h1>{id ? 'Modifier' : 'Ajouter'} une tâche</h1>
            {error ? <p>Impossible de créer la tâche</p> : ''}
            {taskError ? <p>Impossible de récupérer les données de la tâche</p> : ''}
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>Tâche</label>
                    <input type="text" name="taskName"
                        value={formik.values.taskName}
                        onChange={formik.handleChange} />

                    {showError('taskName')}
                </div>
                <div>
                    <label>Date butoir</label>
                    <input type="date" name="dueDate"
                        value={formik.values.dueDate}
                        onChange={formik.handleChange} />
                    {showError('dueDate')}
                </div>
                <div>
                    <label>Description</label>
                    <textarea name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description} />
                </div>
                <div>
                    <button>Valider</button>
                </div>
            </form>
        </div>

    )
}