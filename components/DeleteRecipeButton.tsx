'use client'; // Wajib karena kita menggunakan onClick dan konfirmasi browser

import { Button } from './ui/button';
import { deleteRecipe } from '../app/actions';

export function DeleteRecipeButton({ id }: { id: string }) {
  const handleDelete = async () => {
    // Munculkan pop-up peringatan bawaan browser
    const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus resep ini?");
    
    if (isConfirmed) {
      await deleteRecipe(id); // Panggil fungsi hapus dari actions.ts
    }
  };

  return (
    <Button 
      variant="destructive" // Ini akan membuat tombolnya otomatis berwarna merah (bawaan Shadcn)
      size="sm" 
      onClick={handleDelete}
    >
      🗑️ Hapus
    </Button>
  );
}