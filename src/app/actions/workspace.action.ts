"use server";
import prisma from "@/utils/prisma";

export const createWorkspace = async ({ title }: { title: string }) => {
  try {
    const workspace = await prisma.workspace.create({
      data: {
        title,
      },
    });
    return { message: "Workspace created successfully", data: workspace, success: true };
  } catch (err) {
    return { error: err, success: false };
  }
};

export const getLastWorkspaces = async ({ n }: { n?: number }) => {
  try {
    const workspaces = await prisma.workspace.findMany({
      take: n,
      orderBy: {
        updatedAt: 'desc',
      },
    });
    console.log("fetching workspaces");

    return { workspaces, success: true };
  } catch (err) {
    return { error: err, success: false };
  }
};

export const deleteWorkspaces = async (ids: string[]) => {
  try{
    await prisma.workspace.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
    return { success: true }
  }catch(err){
    return {error: err, success: false}
  }
};