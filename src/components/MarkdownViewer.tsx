import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from 'next/image';
import LinkIcon from './ui/icons/LinkIcon';




export default function MarkdownViewer({ content }: { content: string }) {
    return (
        <Markdown className='prose max-w-none' remarkPlugins={[remarkGfm]}
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return match ? (
                        <SyntaxHighlighter
                            language={match[1]}
                            style={vscDarkPlus}
                            className="syntaxhighlighter"
                        >
                            {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                    ) : (
                        <code {...props}>{children}</code>
                    );
                },
                img: (image) => <Image className='h-full w-auto mx-auto'
                    src={image.src || ''} alt={image.alt || ''} width={500} height={350} />,
                a: (props) => <a href={props.href} target='_blank' className='flex items-center w-fit text-main-blue hover:text-main-darkblue transition-all'>
                    <LinkIcon />
                    <span className='ml-1'>{props.children}</span></a>,
                p: (text) => <p className='my-1 leading-normal'>{text.children}</p>,
                br: (text) => <br />
            }}
        >
            {content}
        </Markdown>
    );
}

