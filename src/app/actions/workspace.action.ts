"use server";
import { getUser } from "@/lib/lucia";
import prisma from "@/utils/prisma";

export const createWorkspace = async ({ title }: { title: string }) => {

  const user = await getUser()
  if (!user) {
    return { error: "You are not logged in", success: false };
  }
  try {
    const workspace = await prisma.workspace.create({
      data: {
        title,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return { message: "Workspace created successfully", data: workspace, success: true };
  } catch (err) {
    return { error: err, success: false };
  }
};

export const getLastWorkspaces = async ({ n }: { n?: number }) => {
  const user = await getUser()
  if (!user) {
    return { error: "You are not logged in", success: false };
  }
  try {
    const workspaces = await prisma.workspace.findMany({
      where: {
        userId: user.id,
      },
      take: n,
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      }
    });

    return { workspaces, success: true };
  } catch (err) {
    return { error: err, success: false };
  }
};

export const deleteWorkspaces = async (ids: string[]) => {
  const user = await getUser()
  if (!user) {
    return { error: "You are not logged in", success: false };
  }

  try{
    await prisma.workspace.deleteMany({
      where: {
        id: {
          in: ids
        },
        userId: user.id
      }
    })
    return { success: true }
  }catch(err){
    return {error: err, success: false}
  }
};

export const getSingleWorkspace = async (id: string) => {
  const user = await getUser()
  if (!user) {
    return { error: "You are not logged in", success: false };
  }

  try{
    const workspace = await prisma.workspace.findUnique({
      where: {
        id: id,
        userId: user.id
      },
      select: {
        id: true,
        title: true,
        tabs: {
          select: {
            id: true,
            title: true,
            content: true,
            updatedAt: true
          }
        }
      }
    })
    if (!workspace) {
      return { error: "Workspace not found or aren't yours", success: false };
    }
    return { workspace, success: true }
  }catch(err){
    return { error: err, success: false }
  }
};


export const createTab = async (workspaceId:string) => {
  const user = await getUser();
  if (!user) {
    console.error("User not logged in");
    return { error: "You are not logged in", success: false };
  }
  try {

    if (!workspaceId) {
      console.error("Workspace ID is required");
      return { error: "Workspace ID is required", success: false };
    }

    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        userId: user.id,
      },
    });

    if (!workspace) {
      console.error("Workspace not found for user:", user.id);
      return { error: "Workspace not found", success: false };
    }

    
    const tab = await prisma.tab.create({
      data: {
        title: "New Tab",
        content: "Write something here",
        workspace: {
          connect: {
            id: workspace.id,
          },
        },
      },
    });

    // Convert Date objects to strings
    const plainTab = {
      ...tab,
      createdAt: tab.createdAt.toISOString(),
      updatedAt: tab.updatedAt.toISOString()
    };
    return { tab: plainTab, success: true };
  } catch (err) {
    console.error("Error creating tab:", err);
    return { error: err, success: false };
  }
};

export const deleteTab = async (id: string) => {
  const user = await getUser();
  if (!user) {
    return { error: "You are not logged in", success: false };
  }
  try{
    await prisma.tab.delete({
      where: {
        id: id,
        workspace:{
          userId: user.id
        }
      }
    })
    return { success: true }
  }
  catch(err){
    return { error: err, success: false }
  }
}

export const updateTab = async (id: string, title: string, content: string) => {
  const user = await getUser();
  if (!user) {
    return { error: "You are not logged in", success: false };
  }

  try{
    await prisma.tab.update({
      where: {
        id: id,
        workspace:{
          userId: user.id
        }
      },
      data: {
        title,
        content,
      },
    });
    return { success: true };
  }catch(err){
    return { error: err, success: false };
  }
};