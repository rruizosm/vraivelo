import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    const variantClass = `btn-${variant}`;

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`btn ${variantClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

export default Button;
