import { Button } from "../../components/ui/button"

interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

export default function Pagination({
  page,
  totalPages,
  onPageChange
}: Props) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">

      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>

    </div>
  )
}