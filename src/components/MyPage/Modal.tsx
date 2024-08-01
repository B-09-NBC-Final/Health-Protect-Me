import React from 'react';

type ModalProps = {
  show: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ show, title, description, onConfirm, onCancel }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-2">{description}</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2">
            취소
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
