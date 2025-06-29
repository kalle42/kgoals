import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface DeleteHabitButtonProps {
  habitId: string;
  onDelete: (habitId: string) => Promise<void>;
}

export function DeleteHabitButton({ habitId, onDelete }: DeleteHabitButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(habitId);
    } catch (error) {
      console.error('Failed to delete habit:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Delete habit"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <X className="w-4 h-4" />
      )}
    </button>
  );
}