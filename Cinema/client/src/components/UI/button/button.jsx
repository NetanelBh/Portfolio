const Button = ({ className, text, type, onClick=null }) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
