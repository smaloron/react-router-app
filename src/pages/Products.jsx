import Navbar from '../components/Navbar';
import { useParams } from 'react-router';
export default function Products () {

    const { id } = useParams();

    return (
        <div>
            <h1>Produits {id} </h1>
        </div>
    );
}