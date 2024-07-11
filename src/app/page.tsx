"use client";

import Loader from "@/components/Loader";
import { WorkspaceTable } from "@/components/Workspaces";
import {motion} from "framer-motion";
export default function Home() {
  return (
    <div>
      <Loader/>
      <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay:1.3, duration: 1}} className="px-3">
        <WorkspaceTable/>
      </motion.div>
    </div>
  );
}
