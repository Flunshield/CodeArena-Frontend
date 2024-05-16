import '../css/Loader.css'; // Assurez-vous que le fichier CSS est correctement importé

const useLoader = () => {
    return (
        <div>
            <div className="loadingspinner">
                <div id="square1"></div>
                <div id="square2"></div>
                <div id="square3"></div>
                <div id="square4"></div>
                <div id="square5"></div>
            </div>
            <span className='text-white flex justify-center font-bold text-xl'>Recherche d&apos;un match en cours </span>
        </div>
    );
}

export default useLoader;
