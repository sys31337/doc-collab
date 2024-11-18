import * as React from 'react'
import { Separator } from '@lib/components/ui/separator'
import { ToolbarButton } from '../toolbar-button'
import { RxCopy, RxExternalLink, RxLinkBreak2 } from 'react-icons/rx'

interface LinkPopoverBlockProps {
  url: string
  onClear: () => void
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const LinkPopoverBlock: React.FC<LinkPopoverBlockProps> = ({ url, onClear, onEdit }) => {
  const [copyTitle, setCopyTitle] = React.useState<string>('Copy')

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyTitle('Copied!')
          setTimeout(() => setCopyTitle('Copy'), 1000)
        })
        .catch(console.error)
    },
    [url]
  )

  const handleOpenLink = React.useCallback(() => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [url])

  return (
    <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton tooltip="Edit link" onClick={onEdit} className="w-auto px-2">
          Edit link
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Open link in a new tab" onClick={handleOpenLink}>
          <RxExternalLink className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Clear link" onClick={onClear}>
          <RxLinkBreak2 className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip={copyTitle}
          onClick={handleCopy}
          tooltipOptions={{
            onPointerDownOutside: e => {
              if (e.target === e.currentTarget) e.preventDefault()
            }
          }}
        >
          <RxCopy className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  )
}
