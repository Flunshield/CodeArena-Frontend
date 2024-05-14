import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import clsx from "clsx";  // Utilisez le thème de votre choix

interface CodeBlockProps {
    code: string | JSON;
    className?: string;
}
const CodeBlock = ({ code, className }: CodeBlockProps) => {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    return (
        <pre className={clsx(className, "rounded-lg overflow-scroll h-auto text-xs sm:text-sm p-2 sm:p-3 bg-gray-100 m-3 sm:m-5 border")}>
      <code className="language-javascript">{code.toString()}</code>
    </pre>
    );
};

export default CodeBlock;
