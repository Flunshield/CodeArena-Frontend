import '../css/Loader.css'; // Assurez-vous que le fichier CSS est correctement importé

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
            <span className='text-white flex justify-center font-bold text-xl'>{msg}</span>
        </div>
    );
}

export default LoaderMatch;
