type Workspace = {
    id: string;
    title: string;
    updatedAt?: Date;
    createdAt?: Date;
}

type Workspaces = {
    workspaces: Workspace[];
};

