import { FaTrash } from 'react-icons/fa';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -top-3 right-2 p-1 rounded-lg dark:bg-red-500 
               text-white opacity-0 group-hover:opacity-100 transition-opacity
               hover:bg-red-700"
    aria-label="Delete message"
  >
    <FaTrash className="w-4 h-4" />
  </button>
);

export default DeleteButton;
