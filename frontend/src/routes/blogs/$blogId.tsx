import { createFileRoute } from '@tanstack/react-router'
import BlogPage from '../../pages/blogContent'

export const Route = createFileRoute('/blogs/$blogId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { blogId } = Route.useParams()
  return <BlogPage id={blogId} />
}
