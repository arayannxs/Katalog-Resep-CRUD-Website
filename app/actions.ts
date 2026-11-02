"use server"

import pool from "../lib/db"
import { revalidatePath } from "next/cache"
import { randomUUID } from "crypto" // Bawaan Node.js untuk membuat ID unik acak

export async function addRecipe(formData: FormData) {
  // 1. Tangkap data dari inputan form
  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const ingredients = formData.get("ingredients") as string
  const instructions = formData.get("instructions") as string
  const id = randomUUID() // Buat ID unik acak (UUID)

  // 2. Eksekusi perintah INSERT ke MySQL
  await pool.query(
    `INSERT INTO Recipe (id, title, category, ingredients, instructions) 
     VALUES (?, ?, ?, ?, ?)`,
    [id, title, category, ingredients, instructions]
  )

  // 3. Refresh halaman utama agar resep baru langsung muncul tanpa perlu F5
  revalidatePath("/")
}

export async function deleteRecipe(id: string) {
  // Mengeksekusi perintah DELETE ke MySQL
  await pool.query("DELETE FROM Recipe WHERE id = ?", [id])

  // Refresh halaman agar resep yang dihapus langsung hilang dari layar
  revalidatePath("/")
}

export async function editRecipe(id: string, formData: FormData) {
  // Tangkap data baru dari form
  const title = formData.get("title") as string
  const category = formData.get("category") as string
  const ingredients = formData.get("ingredients") as string
  const instructions = formData.get("instructions") as string

  // Eksekusi perintah UPDATE ke MySQL
  await pool.query(
    `UPDATE Recipe SET title = ?, category = ?, ingredients = ?, instructions = ? WHERE id = ?`,
    [title, category, ingredients, instructions, id]
  )

  // Refresh halaman
  revalidatePath("/")
}
