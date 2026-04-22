import { createFileRoute, redirect } from '@tanstack/react-router'
import AppEditor from '../../pages/AppEditor'
import { authQueryOptions } from '../../tanStack/query';

export const Route = createFileRoute('/write/')({  
  loader: async ({ context: { queryClient } }) => {
    const data = await queryClient.ensureQueryData(authQueryOptions());
    if (!data.authenticated) throw redirect({ to: '/signin' });
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <AppEditor />
    </>
  )
}
