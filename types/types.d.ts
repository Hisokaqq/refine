type Workspace = {
    id: string;
    title: string;
    updatedAt?: Date;
    createdAt?: Date;
}

type Workspaces = {
    workspaces: Workspace[];
};

type User = {

    id: string;
  
    email: string;
  
    name: string;
  
    pictureUrl: string | null;
  
  };