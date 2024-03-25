import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from 'next/image';

export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <Markdown className='prose lg:prose-xl max-w-none' remarkPlugins={[remarkGfm]}
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                        <SyntaxHighlighter
                            language={match[1]}
                            style={vscDarkPlus}
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code {...props}>{children}</code>
                    );
                },
                img: (image) => <Image className='w-full max-h-60 object-cover'
                    src={image.src || ''} alt={image.alt || ''} width={500} height={350} />
            }}
        >
            {content}
        </Markdown>
    );
}

