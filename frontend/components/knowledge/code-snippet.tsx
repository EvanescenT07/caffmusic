import { CodeSnippetProps } from "@/types/type";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeSnippet({ language, code }: CodeSnippetProps) {
  const [copy, setCopy] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleCopytoClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <div className="relative">
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopytoClipboard}
          className="h-8 w-8 rounded-md bg-muted/80 hover:bg-muted transition-all duration-300 ease-in-out cursor-pointer"
        >
          {copy ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">Copy Code</span>
        </Button>
      </div>

      <div className="rounded-md bg-muted/80 px-4 py-2">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={isDark ? dracula : oneLight}
          customStyle={{ background: "transparent", fontSize: "0.95em" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
      <div className="absolute top-0 left-4 px-2 py-1 text-xs font-medium bg-muted rounded-b-md text-[#383838] dark:text-[#ccc]">
        {language}
      </div>
    </div>
  );
}
