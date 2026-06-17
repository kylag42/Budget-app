import { useState } from "react"
import { useAccounts } from "@/hooks/useAccounts"

type Props = {
  open: boolean
  onClose: () => void
  onCreated?: (id: string) => void
}

export default function AddAccountModal({
  open,
  onClose,
  onCreated
}: Props) {
  const { addAccount } = useAccounts()

  const [name, setName] = useState("")
  const [type, setType] = useState<
    "checking" | "savings">("checking")

  const [error, setError] = useState("")

  console.log("AddCategoryModal open:", open)

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) return

    try {
      setError("")


      const newAccount = await addAccount({
        name,
        type,
      })

      onCreated?.(newAccount.id)
      onClose()

      setName("")
      setType("checking")
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add account"
      )
    }
  }

    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">

          <h2 className="text-lg font-semibold mb-4">
            Add Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Type Select */}
            <select
              value={type}
              onChange={(e) =>
                setType(
                  e.target.value as any
                )
              }
              className="w-full border p-2 rounded"
            >
              <option value="checking">
                Checking
              </option>
              <option value="savings">
                Savings
              </option>
            </select>

            {/* Name */}
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Account name"
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
