import React, { useState } from 'react';
import LoadingComponent from '../components/loading';

import { useUserStatus } from '../tanStack/userStatusHook';
import { postNewBlog } from '../api/blogs';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '../main';


function AppEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { userDetails } = useUserStatus();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (blogPayload: { author: string; title: string; content: string }) => {
      return postNewBlog(userDetails.id, blogPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate({ to: '/' });
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      author: userDetails?.username || "",
      title,
      content,
    });
  };

  if (mutation.isPending) {
    return <LoadingComponent />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='px-6 pt-6 pb-2'>
        <input
          placeholder='Post title...'
          className="w-full bg-transparent text-3xl font-bold text-gray-900 dark:text-gray-400 dark:placeholder:text-gray-200 outline-none border-b-2 border-transparent focus:border-gray-300 dark:focus:border-gray-700 transition-colors pb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='px-6 py-2'>
        <textarea
          placeholder='Write your blog content here...'
          className="w-full min-h-[400px] bg-transparent text-gray-900 dark:text-gray-400 outline-none resize-y"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button type='submit' className='rounded px-5 py-3 absolute right-5 bottom-5 bg-blue-400 active:scale-[90%] cursor-pointer'>Save</button>
    </form>
  );
}



export default AppEditor;