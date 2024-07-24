import React from 'react'
import Tabs from '../components/Tabs'
import TextField from '../components/TextField'
import { getSingleWorkspace } from '@/app/actions/workspace.action'

type Props = {
    params: {
        id: string
    }
}

const page = async ({params:{id}}: Props) => {
  const {workspace, error, success} = await getSingleWorkspace(id)
  if (!success) {
    return <div className='h-[100vh] flex justify-center items-center'>Error</div>
  }
  const {id: workspaceId, title, tabs} = workspace ?? { id: '', title: '', tabs: [] };
  return (
    <div className='w-full pt-1 h-[calc(100vh-3rem)] flex'>
      <div className='w-1/5 h-full shadow-md '>Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
      <div className='h-full flex-col flex-grow'>
        <Tabs workspaceId={workspaceId} tabs = {tabs}/>
        <TextField />
      </div>
    </div>
  )
}

export default page