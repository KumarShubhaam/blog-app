import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/home')({
  component: RouteComponent,
  
})

function RouteComponent() {

  return (
    <p>This is /home </p>
  )
}
