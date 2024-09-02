"use server";
import { getUser } from "@/lib/lucia";
import prisma from "@/utils/prisma";
import { v4 as uuidv4 } from "uuid";

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

    
    const initialBlock = {
      id: uuidv4(),  // Generates a unique ID
      value: `Classical Mechanics:
      The Lagrangian function is defined as the difference between the kinetic and potential energy of a system: 
      $$L = T - V$$
      where \\(T\\) is the kinetic energy and \\(V\\) is the potential energy. For a particle moving in a conservative force field, the equations of motion can be derived from the Euler-Lagrange equation:
      $$\\frac{d}{dt}\\left(\\frac{\\partial L}{\\partial \\dot{q_i}}\\right) - \\frac{\\partial L}{\\partial q_i} = 0$$
      This forms the basis of Lagrangian mechanics, which provides a powerful framework for analyzing complex systems.
    
      ### Expanding LaTeX Capabilities:
      LaTeX is not just limited to simple equations; it is a highly versatile tool for typesetting complex mathematical expressions, as well as formatting entire documents. For example, LaTeX can handle matrices, integrals, summations, and multi-line equations:
    
      #### Matrices:
      To define a matrix in LaTeX, you can use the \`bmatrix\` environment:
      $$
      \\mathbf{A} = \\begin{bmatrix}
      a_{11} & a_{12} & \\dots  & a_{1n} \\\\
      a_{21} & a_{22} & \\dots  & a_{2n} \\\\
      \\vdots & \\vdots & \\ddots & \\vdots \\\\
      a_{m1} & a_{m2} & \\dots  & a_{mn} 
      \\end{bmatrix}
      $$
      This is particularly useful in linear algebra, where matrix manipulations are common.
    
      #### Integrals and Summations:
      LaTeX also excels at representing integrals and summations, which are common in physics and calculus:
      $$
      \\int_{a}^{b} x^2 \\, dx = \\left[\\frac{x^3}{3}\\right]_{a}^{b} = \\frac{b^3}{3} - \\frac{a^3}{3}
      $$
      Similarly, for summations:
      $$
      \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}
      $$
      These features make LaTeX indispensable for anyone working with advanced mathematics.
    
      #### Multi-line Equations:
      When dealing with longer equations that span multiple lines, LaTeX provides environments like \`align\` to neatly arrange the equations:
      $$
      \\begin{align*}
      E &= mc^2 \\\\
      F &= ma \\\\
      p &= \\frac{h}{\\lambda}
      \\end{align*}
      $$
      This is extremely useful for deriving equations step by step, ensuring clarity and readability.
    
      ### Document Formatting:
      Beyond mathematical expressions, LaTeX is a powerful tool for formatting entire documents. It allows you to control the layout with precision, including:
      - **Sectioning:** With commands like \`\\section{}\`, \`\\subsection{}\`, and \`\\subsubsection{}\`, you can create a well-organized document structure.
      - **Tables:** LaTeX can create complex tables with ease, using the \`tabular\` environment.
      - **References and Citations:** LaTeX automatically handles numbering of equations, figures, and tables, and it can manage a bibliography with packages like \`biblatex\`.
    
      ### Learn More About LaTeX:
      To dive deeper into the capabilities of LaTeX, including advanced mathematical typesetting, document formatting, and more, you can explore the [Overleaf LaTeX tutorials](https://www.overleaf.com/learn/latex). Overleaf provides an interactive platform where you can practice LaTeX coding and see the results in real-time.
    
      LaTeX is a crucial tool for anyone involved in academic writing, scientific research, or any field that requires precise and professional typesetting of complex content. Whether you're preparing a research paper, writing a book, or creating presentation slides, mastering LaTeX will significantly enhance the quality of your work.`,
      
      is_opened: true
    };

    // Create the tab with the blocks stored as a stringified array
    const tab = await prisma.tab.create({
      data: {
        title: "New Tab",
        content: JSON.stringify([initialBlock]), // Store the blocks as a stringified array
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