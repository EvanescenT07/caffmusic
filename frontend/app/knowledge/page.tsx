import KnowledgeContent from "@/components/knowledge/knowledge-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge | CaffMusic",
  description:
    "Learn about the machine learning behind our music genre detection system",
};

const KnowledgePage = () => {
  return (
    <main className="container mx-auto min-h-screen pt-8">
      <KnowledgeContent />
    </main>
  );
};

export default KnowledgePage;
