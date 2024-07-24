type Workspace = {
    id: string;
    title: string;
    updatedAt?: Date;
    createdAt?: Date;
    tabs?: Tab[];
  };
  
  type Workspaces = {
    workspaces: Workspace[];
  };
  
  type User = {
    id: string;
    email: string;
    name: string;
    pictureUrl: string | null;
  };
  
  type Tab = {
    id: string;
    title: string;
    content: string;
    updatedAt: Date| string;
  };
  
  type Tabs = {
    tabs: Tab[];
  };
  