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
    });
    console.log("fetching workspaces");

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


