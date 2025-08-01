import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TDifficulty } from "@/types";
import { motion } from "framer-motion";

type DifficultyBarProps = {
  difficulty: TDifficulty;
  onDifficultyChange: (t: string) => void;
};

export const DifficultyBar = ({
  difficulty,
  onDifficultyChange,
}: DifficultyBarProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "anticipate",
        duration: 1,
      }}
      className="pb-10"
    >
      <Tabs value={difficulty} onValueChange={onDifficultyChange}>
        <TabsList className="grid w-full grid-cols-3 rounded-sm p-2">
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.div>
  );
};
