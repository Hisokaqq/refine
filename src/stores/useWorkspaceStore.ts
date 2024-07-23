import { getLastWorkspaces } from '@/app/actions/workspace.action';
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