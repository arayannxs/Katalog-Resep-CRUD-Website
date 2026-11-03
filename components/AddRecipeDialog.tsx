'use client'; // Wajib karena kita menggunakan state (untuk buka-tutup pop-up)

import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { addRecipe } from '../app/actions';

export function AddRecipeDialog() {
  const [open, setOpen] = useState(false);

  // Fungsi ini dipanggil saat tombol submit diklik
  async function handleSubmit(formData: FormData) {
    await addRecipe(formData); // Kirim data ke database
    setOpen(false); // Tutup pop-up otomatis setelah sukses
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      <DialogTrigger asChild>
        <Button className="mb-6">➕ Tambah Resep</Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Resep Baru</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Nama Masakan</Label>
            <Input id="title" name="title" required placeholder="Contoh: Nasi Goreng Spesial" />
          </div>
          
          <div>
            <Label htmlFor="category">Kategori</Label>
            <Input id="category" name="category" required placeholder="Contoh: Main Course" />
          </div>
          
          <div>
            <Label htmlFor="ingredients">Bahan-bahan</Label>
            <Textarea id="ingredients" name="ingredients" required placeholder="1. Nasi putih&#10;2. Bawang merah..." rows={3} />
          </div>
          
          <div>
            <Label htmlFor="instructions">Cara Membuat</Label>
            <Textarea id="instructions" name="instructions" required placeholder="1. Panaskan minyak...&#10;2. Tumis bawang..." rows={3} />
          </div>
          
          <Button type="submit" className="w-full">Simpan Resep</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}