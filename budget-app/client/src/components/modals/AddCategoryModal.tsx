import { useState } from "react"
import { useCategories } from "@/hooks/useCategories"

type Props = {
  open: boolean
  onClose: () => void
  onCreated?: (id: string) => void
}

export default function AddCategoryModal({
  open,
  onClose,
  onCreated,
}: Props) {

  const { addCategory } = useCategories()

  const [name, setName] = useState("")
  const [error, setError] = useState("")

  if (!open) return null

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (!name.trim()) return

    try {
      setError("")

      const newCategory =
        await addCategory({
          name,
        })

      onCreated?.(newCategory.id)

      setName("")
      onClose()

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add category"
      )
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg p-6 w-full max-w-md">

        <h2 className="text-lg font-semibold mb-4">
          Add Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Category name"
            className="w-full border rounded p-2"
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">

            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-accent-brown text-white px-4 py-2 rounded"
            >
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}