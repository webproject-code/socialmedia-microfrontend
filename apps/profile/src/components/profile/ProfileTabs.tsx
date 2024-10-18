import {
  Box,
  Grid,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@social-media/evoke-ui';
import React from 'react';
import FriendsCard from './FriendsCard';

const ProfileTabs: React.FC = () => {
  return (
    <>
      <Box className="p-4 md:p-8 h-full max-w-[90%] m-auto">
        <Box as="div" className="">
          <Tabs
            defaultValue="Tab1"
            className="border-opacity-20 md:p-8 h-auto"
            border
          >
            <TabsList>
              <TabsTrigger
                value="Tab1"
                className=" text-black dark:text-dark-silverSteel sm:text-lg lg:text-2xl sd:text-3xl bg-none"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="Tab2"
                className=" text-black dark:text-dark-silverSteel sm:text-lg lg:text-2xl sd:text-3xl bg-none"
              >
                Friends
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Tab1" className="">
              <div>Hello world from Tab 1</div>
            </TabsContent>
            <TabsContent value="Tab2" className="md:p-8">
              <Grid
                spacing={'medium'}
                rows={3}
                columns={{ sm: 1, md: 3 }}
                columnSpacing={'medium'}
                className="overflow-auto"
              >
                <Grid.GridItem>
                  <FriendsCard />
                </Grid.GridItem>
                <Grid.GridItem>
                  <FriendsCard />
                </Grid.GridItem>
                <Grid.GridItem>
                  <FriendsCard />
                </Grid.GridItem>
              </Grid>
            </TabsContent>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default ProfileTabs;
