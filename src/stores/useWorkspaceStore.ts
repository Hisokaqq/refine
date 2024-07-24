import { getLastWorkspaces, getSingleWorkspace } from '@/app/actions/workspace.action';
import {create} from 'zustand';

type WorkspaceState = {
    workspaces: Workspace[],
    isLoading: boolean,
    error: string | null,
    fetchWorkspaces: (params: {n?: number}) => Promise<void>
}

const useWorkspaceStore = create<WorkspaceState>((set) => ({
    workspaces: [],
    isLoading: false,
    error: null,
    fetchWorkspaces: async (params) => {
      set({ isLoading: true });
      try {
        const { workspaces, success, error } = await getLastWorkspaces(params);
        if (success && workspaces) {
          set({ workspaces, isLoading: false, error: null });
        } else if (error) {
          set({ error: error.toString(), isLoading: false });
        }
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },
  }));
  
  export default useWorkspaceStore;

  
  type TabState = {
    workspace: Workspace | null,
    selectedTab: Tab | null,
    isLoading?: boolean,
    error?: string | null,
    fetchSingleWorkspace: (id: string) => Promise<void>,
    setSelectedTab: (tab: Tab | null) => void,
  }
  
  export const useSignleWorkspaceStore = create<TabState>((set) => ({
    workspace: null,
    selectedTab: null,
    isLoading: false,
    error: null,
    fetchSingleWorkspace: async (id) => {
      set({ isLoading: true });
      try {
        const { workspace, success, error } = await getSingleWorkspace(id);
        if (success && workspace) {
          set({ workspace, isLoading: false, error: null });
        } else if (error) {
          set({ error: error.toString(), isLoading: false });
        }
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },
    setSelectedTab: (tab) => set({ selectedTab: tab }),
  }));
  