import { Formik, useFormik } from 'formik'
import useAxios from 'axios-hooks';
import conf from '../config';
import { useNavigate } from 'react-router-dom';


export default function TaskForm () {

    const navigate = useNavigate();

    const [{ data, loading, error }, addTask] = useAxios(
        { url: conf.url, method: 'POST' }, { manual: true });

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
            addTask({ data: values });
            navigate("/");
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
            <h1>Nouvelle tâche</h1>
            {error ? <p>Impossible de créer la tâche</p> : ''}
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