import { Card } from '@social-media/evoke-ui';
import React from 'react';

const FriendsCard: React.FC = () => {
  return (
    <>
      <Card className="h-24 border shadow-lg dark:border-none w-full bg-light-primary dark:bg-dark-primary">
        <Card.Content className="flex pt-4 items-center justify-between gap-4">
          <div className="flex gap-2 items-center h-full">
            <img
              className="w-11 h-11 rounded-full ring-1 ring-secondary"
              src="https://mui.com/static/images/avatar/2.jpg"
              alt="profile"
            />
            <div className="flex flex-col">
              <h6>Username</h6>
              <p className="text-sm text-slate-600 dark:text-silverSteel">
                Lorem ipsum...
              </p>
            </div>
          </div>
          <div className="h-auto w-auto">
            <img src="../../../assets/Message.svg" />
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

export default FriendsCard;
