import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/settings/import-export')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/settings/import-export"!</div>
}
