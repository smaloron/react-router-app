import { Link } from 'react-router-dom';

export default function Navbar () {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/produits/5">Produits 5</Link>
            <Link to="/produits/8">Produits 8</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    )
}