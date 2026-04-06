import type { ReactNode } from 'react';
import { CodeBlock } from './CodeBlock';

export interface ComponentExample {
  title: string;
  description?: string;
  demo: ReactNode;
  code: string;
}

export interface ComponentPageProps {
  name: string;
  description: string;
  examples: ComponentExample[];
}

export function ComponentPage({ name, description, examples }: ComponentPageProps) {
  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-800 leading-800 font-semibold text-neutral-foreground-1">{name}</h1>
        <p className="mt-xs text-300 leading-300 text-neutral-foreground-2">{description}</p>
      </div>

      {examples.map((example, i) => (
        <section key={i} className="space-y-s">
          <h2 className="text-500 leading-500 font-semibold text-neutral-foreground-1">{example.title}</h2>
          {example.description && (
            <p className="text-300 leading-300 text-neutral-foreground-2">{example.description}</p>
          )}
          <div className="rounded-medium border border-neutral-stroke-2 bg-neutral-background-1 p-l">
            {example.demo}
          </div>
          <CodeBlock code={example.code} />
        </section>
      ))}
    </div>
  );
}
