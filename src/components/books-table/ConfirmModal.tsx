import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[999] bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">Confirmation de Suppression</h2>
                <p className="mb-6">Êtes-vous sûr de vouloir supprimer ?</p>
                <div className="flex justify-end">
                    <button
                        className="orangebackcolor text-white py-2 px-4 rounded mr-2 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Annuler
                    </button>
                    <button
                        className="graybackcolor text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;