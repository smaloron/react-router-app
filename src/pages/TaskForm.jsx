import { Formik, useFormik } from 'formik'

export default function TaskForm () {

    const validate = (values) => {
        const errors = {};



        if (!values.taskName) {
            errors.taskName = 'Le nom de la tâche est obligatoire';
        }

        if (!values.dueDate) {
            errors.dueDate = 'Une tâche doit avoir une date butoir'
        }

        console.log(values, errors, values.dueDate === '')

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
            console.log(formik);
            console.log(values);
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