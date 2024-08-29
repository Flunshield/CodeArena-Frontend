import '../css/Loader.css';
import '../css/Loader-login.css';

interface LoaderProps {
    msg: string;
    className?: string;
    type?: string;
}
const LoaderMatch = ({ msg, className, type }: LoaderProps) => {
    return (
        <div className={className}>
            {type === "login" && (
                <div className="spinner">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )}
            {type !== "login" && (
            <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
                )}
            <span className='text-tertiari flex justify-center font-bold text-xl'>{msg}</span>
        </div>
    );
}

export default LoaderMatch;
