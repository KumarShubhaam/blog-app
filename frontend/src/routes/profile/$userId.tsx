import { createFileRoute } from '@tanstack/react-router'
import Profile from '../../pages/profile'

export const Route = createFileRoute('/profile/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profile />
}
