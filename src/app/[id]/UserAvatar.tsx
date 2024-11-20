import React, { useState } from 'react'
import { Avatar } from '@components/Avatars';
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover';

interface UserAvatarProps {
  avatarProps: {
    style: {
      marginLeft: string;
    };
    size: number;
    outlineWidth: number;
    outlineColor: string;
  };
  src: string;
  name: string;
  color: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarProps, src, name, color }) => {
  const [open, setOpen] = useState(false);
  const handleMouseEnter = () => setOpen(true);
  const handleMouseLeave = () => setOpen(false);

  return (
    <Popover open={open}>
      <PopoverTrigger onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Avatar
          {...avatarProps}
          src={src}
          name={name}
          color={color}
        />
      </PopoverTrigger>
      <PopoverContent className='bg-black border-0 text-white px-4 py-1 w-fit rounded-full text-xs'>
        {name}
      </PopoverContent>
    </Popover>
  )
}

export default UserAvatar
