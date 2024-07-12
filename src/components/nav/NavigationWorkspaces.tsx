import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import React from 'react';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, id, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={`/workspace/${id}`}
          className={`block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
          {...props}
        >
          <div className="text-xs font-medium leading-none">{title?.substring(0, 60)}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';





function NavigationWorkspaces({ workspaces }: Workspaces) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-3 py-2 h-8 bg-transparent">
            Workspaces
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex flex-col w-[200px] gap-1 p-2">
              {workspaces.length > 0 ? (
                workspaces.map((workspace) => (
                  <ListItem key={workspace.id} id={workspace.id} title={workspace.title}>
                    {`Last changed: ${workspace.updatedAt ? workspace.updatedAt.toLocaleDateString() : 'N/A'}`}
                  </ListItem>
                ))
              ) : (
                <li className="block select-none space-y-1 p-2 leading-none">
                  <div className="text-xs font-medium leading-none">No projects available</div>
                  <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">You don&apos;t have any projects yet.</p>
                </li>
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavigationWorkspaces;
