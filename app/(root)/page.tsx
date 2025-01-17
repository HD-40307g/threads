'use client'

import ThreadCard from "@/components/cards/ThreadCard";
import Pagination from '@/components/shared/Pagination';
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Home({ searchParams }: { searchParams: { [key:string]: string | undefined} }) {
  const result = await fetchPosts(searchParams.page ? +searchParams.page : 1, 30);
  const user = await currentUser();
  if(!user) return null;
  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post) => (
              <ThreadCard 
                key={post._id} 
                id={post._id} 
                currentUserId={user.id} 
                parentId={post.parentId} 
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
      <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
};

export default Home;