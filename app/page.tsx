import pool from "../lib/db"
import { AddRecipeDialog } from "../components/AddRecipeDialog"
import { DeleteRecipeButton } from "../components/DeleteRecipeButton"
import { EditRecipeDialog } from '../components/EditRecipeDialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card"

// Mendefinisikan tipe data agar TypeScript (VS Code) tidak rewel
type Recipe = {
  id: string
  title: string
  category: string
  ingredients: string
  instructions: string
}

export default async function Home() {
  // Ambil data resep dari database
  const [rows] = await pool.query(
    "SELECT * FROM Recipe ORDER BY createdAt DESC"
  )
  const recipes = rows as Recipe[]

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-2 text-3xl font-bold">Katalog Resep Makanan 🍳</h1>
      <p className="mb-8 text-slate-500">
        Simpan dan kelola semua resep masakan favoritmu di sini.
      </p>

      {/* Tombol Pop-up Form Tambah Resep */}
      <AddRecipeDialog />

      {/* Grid Layout untuk memajang Card Resep */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="flex flex-col shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-xl text-orange-600">
                {recipe.title}
              </CardTitle>
              <CardDescription className="font-medium text-slate-500">
                Kategori: {recipe.category}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-grow space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-semibold text-slate-700">
                  Bahan-bahan:
                </h4>
                {/* whitespace-pre-line berfungsi agar "Enter" atau baris baru dari database tetap terbaca */}
                <p className="text-sm whitespace-pre-line text-slate-600">
                  {recipe.ingredients}
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-semibold text-slate-700">
                  Cara Membuat:
                </h4>
                <p className="text-sm whitespace-pre-line text-slate-600">
                  {recipe.instructions}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t pt-4 mt-2">
              <DeleteRecipeButton id={recipe.id} />
              <EditRecipeDialog recipe={recipe} />
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pesan jika database masih kosong */}
      {recipes.length === 0 && (
        <div className="mt-12 rounded-lg border border-dashed bg-slate-50 p-8 text-center text-slate-500">
          Belum ada resep di katalogmu. Yuk, tambah resep pertamamu sekarang!
        </div>
      )}
    </main>
  )
}
