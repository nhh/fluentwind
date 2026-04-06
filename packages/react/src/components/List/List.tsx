import { forwardRef, createContext, useContext } from 'react';
import { cn } from '../../utils/cn';
import type { ListProps, ListItemProps } from './List.types';

const ListContext = createContext<{ navigable: boolean }>({ navigable: false });

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ navigable, className, children, ...props }, ref) => {
    return (
      <ListContext.Provider value={{ navigable: !!navigable }}>
        <ul
          ref={ref}
          role={navigable ? 'listbox' : 'list'}
          className={cn('list-none m-0 p-0', className)}
          {...props}
        >
          {children}
        </ul>
      </ListContext.Provider>
    );
  },
);

List.displayName = 'List';

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ secondaryText, media, action, selected, className, children, ...props }, ref) => {
    const { navigable } = useContext(ListContext);

    return (
      <li
        ref={ref}
        role={navigable ? 'option' : 'listitem'}
        aria-selected={selected ?? undefined}
        className={cn(
          'flex items-center gap-m px-m py-s text-neutral-foreground-1 cursor-default transition-colors duration-fast',
          'hover:bg-subtle-background-hover active:bg-subtle-background-pressed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-stroke-focus-2',
          selected && 'bg-subtle-background-selected',
          className,
        )}
        tabIndex={0}
        {...props}
      >
        {media && <span className="shrink-0">{media}</span>}
        <span className="flex-1 min-w-0">
          <span className="block text-300 leading-300 truncate">{children}</span>
          {secondaryText && (
            <span className="block text-200 leading-200 text-neutral-foreground-2 truncate">
              {secondaryText}
            </span>
          )}
        </span>
        {action && <span className="shrink-0 ml-auto">{action}</span>}
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';
