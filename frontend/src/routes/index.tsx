import { createFileRoute } from '@tanstack/react-router';
import GuestPage from '../pages/guest';
import HomePage from '../pages/home';
import { authQueryOptions } from '../tanStack/query';
import LoadingComponent from '../components/loading';

export const Route = createFileRoute('/')({
  loader: async ({ context: { queryClient } }) =>
    await queryClient.fetchQuery({ ...authQueryOptions(), staleTime: 0 }),
  pendingComponent: LoadingComponent,
  pendingMs: 0,
  component: RouteComponent,
})

function RouteComponent() {
  const isLogin = Route.useLoaderData();
  console.log('render')
  console.log(isLogin);

  return (
    <>
      {isLogin.authenticated ? <HomePage /> : <GuestPage />}
    </>
  )
}
