import Loader from "@/components/Loader";
import { WorkspaceTable } from "@/components/Workspaces";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Loader/>
      <div className="px-3">
        <WorkspaceTable/>
      </div>
    </div>
  );
}
