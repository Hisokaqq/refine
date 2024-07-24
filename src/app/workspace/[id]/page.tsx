import React from 'react';
import Tabs from '../components/Tabs';
import TextField from '../components/TextField';
import Container from '../components/Container';
import { useSignleWorkspaceStore } from '@/stores/useWorkspaceStore';
import Chat from '../components/Chat';

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id } }: Props) => {
  return (
    <Container id={id}>
      <div className='w-full pt-1 h-[calc(100vh-3rem)] flex'>
        <Chat />
        <div className='h-full flex-col flex-grow'>
          <Tabs />
          <TextField />
        </div>
      </div>
    </Container>
  );
};

export default Page;
