"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { editRecipe } from "../app/actions"

// Mendefinisikan tipe data resep yang diterima
type Recipe = {
  id: string
  title: string
  category: string
  ingredients: string
  instructions: string
}

export function EditRecipeDialog({ recipe }: { recipe: Recipe }) {
  const [open, setOpen] = useState(false)

  // Fungsi yang dipanggil saat form disubmit
  async function handleSubmit(formData: FormData) {
    await editRecipe(recipe.id, formData) // Kirim ID dan data baru
    setOpen(false) // Tutup pop-up
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          ✏️ Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Resep</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Nama Masakan</Label>
            {/* defaultValue digunakan untuk memunculkan data lama */}
            <Input
              id="title"
              name="title"
              defaultValue={recipe.title}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori</Label>
            <Input
              id="category"
              name="category"
              defaultValue={recipe.category}
              required
            />
          </div>

          <div>
            <Label htmlFor="ingredients">Bahan-bahan</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              defaultValue={recipe.ingredients}
              required
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="instructions">Cara Membuat</Label>
            <Textarea
              id="instructions"
              name="instructions"
              defaultValue={recipe.instructions}
              required
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Simpan Perubahan
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
