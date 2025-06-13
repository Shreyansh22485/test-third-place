'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PolicySkeleton } from '@/components/ui/skeleton';

interface PolicyPageProps {
  title: string;
  filename: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, filename }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/${filename}.md`);
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.statusText}`);
        }
        const text = await response.text();
        // Remove HTML comments from markdown
        const cleanText = text.replace(/<!--[\s\S]*?-->/g, '');
        setContent(cleanText);
      } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        setContent('# Error\n\nError loading content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [filename]);
  if (loading) {
    return <PolicySkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4">
        <Link href="/dashboard/profile" className="text-blue-600 hover:text-blue-800">
          ← Back
        </Link>
        <span className="text-lg italic font-semibold text-gray-700">{title.toUpperCase()}</span>
        <div className="w-12" /> {/* Spacer for centering */}
      </header>      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="prose prose-gray prose-lg max-w-none font-[family-name:var(--font-crimson-pro)]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{                // Custom styling for markdown elements
                h1: ({ children, ...props }) => (
                  <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-0 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8 first:mt-0 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </h3>
                ),
                h4: ({ children, ...props }) => (
                  <h4 className="text-base font-semibold text-gray-800 mb-2 mt-4 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </h4>
                ),
                p: ({ children, ...props }) => (
                  <p className="text-gray-700 mb-4 leading-relaxed font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </p>
                ),                ul: ({ children, ...props }) => (
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 ml-4 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="text-gray-700 mb-1 font-[family-name:var(--font-crimson-pro)]" {...props}>
                    {children}
                  </li>
                ),
                a: ({ children, href, ...props }) => (
                  <a 
                    href={href} 
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                ),
                strong: ({ children, ...props }) => (
                  <strong className="font-semibold text-gray-900" {...props}>
                    {children}
                  </strong>
                ),
                em: ({ children, ...props }) => (
                  <em className="italic text-gray-800" {...props}>
                    {children}
                  </em>
                ),
                blockquote: ({ children, ...props }) => (
                  <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600" {...props}>
                    {children}
                  </blockquote>
                ),
                code: ({ children, className, ...props }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-gray-100 text-gray-800 p-4 rounded-lg text-sm overflow-x-auto" {...props}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children, ...props }) => (
                  <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4" {...props}>
                    {children}
                  </pre>
                ),
                hr: ({ ...props }) => (
                  <hr className="border-gray-300 my-8" {...props} />
                ),
                table: ({ children, ...props }) => (
                  <div className="overflow-x-auto mb-4">
                    <table className="min-w-full divide-y divide-gray-200" {...props}>
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children, ...props }) => (
                  <thead className="bg-gray-50" {...props}>
                    {children}
                  </thead>
                ),
                tbody: ({ children, ...props }) => (
                  <tbody className="bg-white divide-y divide-gray-200" {...props}>
                    {children}
                  </tbody>
                ),
                th: ({ children, ...props }) => (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props}>
                    {children}
                  </th>
                ),
                td: ({ children, ...props }) => (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props}>
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;