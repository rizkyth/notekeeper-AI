/**
 * Node modules
 */

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Components
 */
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Kbd from '@/components/Kbd';

/**
 * Types
 */
type TopAppBarProps = {
  tittle: string;
  taskCount?: number;
};

const TopAppBar: React.FC<TopAppBarProps> = ({ tittle, taskCount }) => {
  const [showTittle, setShowTittle] = useState(false);

  useEffect(() => {
    const listener = () => setShowTittle(window.scrollY > 70);
    listener();
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);
  return (
    <div
      className={cn(
        'sticky z-40 bg-background top-0 h-14 grid grid-cols-[40px,minmax(0,1fr),40px] items-center px-4',
        showTittle && 'border-b',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent className='flex items-center'>
          <p>Toogle sidebar</p>

          <Kbd kbdList={['Ctrl', 'B']} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          'max-w-[480px] mx-auto text-center transition-[transform,opacity]',
          showTittle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        <h1 className='font-semibold truncate'>{tittle}</h1>
        {Boolean(taskCount) && (
          <div className='text-xs text-muted-foreground'>{taskCount} task</div>
        )}
      </div>
    </div>
  );
};

export default TopAppBar;
