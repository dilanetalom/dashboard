import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingModal: React.FC = () => {
    return (
        <div style={modalStyle}>
            <div className='flex flex-col justify-center'>
                {/* <h2 className='text-white'>Chargement...</h2> */}
                <ClipLoader color="#ffff" loading={true} size={50} />
                {/* Tu peux ajouter un spinner ici */}
                {/* <div className="loader"></div> */}
            </div>
        </div>
    );
};

// Styles pour la modal
const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: '290px',
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

// const loadingStyle: React.CSSProperties = {
//     backgroundColor: 'white',
//     padding: '20px',
//     borderRadius: '8px',
//     textAlign: 'center',
// };

export default LoadingModal;
