import { useEffect, useRef } from 'react'

interface DialogProps {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}

export function Dialog({
  open,
  title,
  children,
  onClose,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (open && !dialog.open) {
      dialog.showModal()
    }

    if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClose={onClose}
    >
      <div className="dialog-content">
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  )
}
