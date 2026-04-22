import { createFileRoute } from '@tanstack/react-router'
import Signin from '../pages/signin'

export const Route = createFileRoute('/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Signin />
}
