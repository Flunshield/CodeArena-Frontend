import '../css/Loader.css';
import '../css/Loader-login.css';

interface LoaderProps {
    msg: string;
    className?: string;
}
const LoaderMatch = ({ msg, className }: LoaderProps) => {
    return (
        <div className={className}>
            <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
            <span className='flex justify-center text-xl font-bold'>{msg}</span>
        </div>
    );
}

export default LoaderMatch;
