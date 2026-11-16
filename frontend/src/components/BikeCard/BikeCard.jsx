import { Link } from 'react-router-dom';
import { productPath } from '../../lib/productUrl';
import { parsePrice, formatPrice } from '../../lib/price';
import './BikeCard.css';

// Compact bike card: image, name and a prominent price. The whole card is a real link,
// so Google and keyboard users can follow it.
const BikeCard = ({ bike }) => {
    const price = parsePrice(bike.price);

    return (
        <Link to={productPath(bike)} className="vb-card">
            <div className="vb-card-img">
                {bike.image_url ? (
                    <img src={bike.image_url} alt={bike.model} loading="lazy" decoding="async" />
                ) : (
                    <span className="vb-card-placeholder">{(bike.brand || '?').charAt(0)}</span>
                )}
            </div>
            <div className="vb-card-body">
                <span className="vb-card-brand">{bike.brand}</span>
                <h3 className="vb-card-model">{bike.model}</h3>
                <span className="vb-card-price">{price ? formatPrice(price) : bike.price}</span>
            </div>
        </Link>
    );
};

export default BikeCard;
