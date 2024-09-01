import React from 'react';
import Tabs from '../components/Tabs';
import TextField from '../components/TextField';
import Container from '../components/Container';
import Chat from '../components/Chat';

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params: { id } }: Props) => {
  return (
    <Container id={id}>
      <div className="w-full pt-1 h-[calc(100vh-3rem)] flex overflow-hidden">
        <Chat />
        <div className="h-full flex flex-col flex-grow">
          <Tabs />
          <div className="flex-grow overflow-auto p-4">
            <TextField />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
