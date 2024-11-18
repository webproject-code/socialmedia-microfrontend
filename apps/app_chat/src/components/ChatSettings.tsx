import { ChatType } from '@social-media/api';
import { Button } from '@social-media/evoke-ui';
import { Dropdown } from '@social-media/utils';
import React from 'react';
import { FaEllipsisV, FaHandSparkles, FaSearch, FaUsers } from 'react-icons/fa';

interface ChatSettingsProps {
  chatType: ChatType;
  onSearchClick: () => void;
  onVanishModeToggle: () => void;
  isVanishModeEnabled?: boolean;
  onGroupInfoClick: () => void;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({
  chatType,
  onSearchClick,
  onVanishModeToggle,
  isVanishModeEnabled,
  onGroupInfoClick,
}) => {
  const getDropdownItems = () => {
    const commonItems = [
      {
        icon: <FaSearch className="text-dark-lavender" />,
        label: 'Search in chat',
        onClick: onSearchClick,
        divider: true,
      },
    ];

    const oneOnOneItems = [
      {
        icon: <FaHandSparkles className="text-dark-lavender" />,
        label: `${isVanishModeEnabled ? 'Disable' : 'Enable'} vanish mode`,
        onClick: onVanishModeToggle,
      },
    ];

    const groupItems = [
      {
        icon: <FaUsers className="text-dark-lavender" />,
        label: 'Group info',
        onClick: onGroupInfoClick,
      },
    ];

    return [
      ...commonItems,
      ...(chatType === ChatType.ONE_ON_ONE ? oneOnOneItems : groupItems),
    ];
  };

  return (
    <Dropdown
      trigger={
        <Button className="w-fit" variant="icon">
          <FaEllipsisV className="dark:text-dark-lavender dark:hover:text-dark-secondary/90" />
        </Button>
      }
      align="right"
      items={getDropdownItems()}
    />
  );
};

export default ChatSettings;
