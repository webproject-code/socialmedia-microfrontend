export interface ChatCardMessage {
  name: string;
  bio: string;
  bioTime?: string;
  profilePicture: string;
}

export const chatMessages: ChatCardMessage[] = [
  {
    name: 'Alice Johnson',
    bio: 'Hey! Are we still on for dinner?',
    bioTime: '10:15 AM',
    profilePicture: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Bob Smith',
    bio: 'Just finished the report. Check it out!',
    bioTime: '9:45 AM',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Charlie Brown',
    bio: 'Can you send me the files?',
    bioTime: '8:30 AM',
    profilePicture: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Diana Prince',
    bio: 'Looking forward to our trip!',
    bioTime: 'Yesterday',
    profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Ethan Hunt',
    bio: 'Mission accomplished!',
    bioTime: 'Monday',
    profilePicture: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Fiona Gallagher',
    bio: 'Can we reschedule our meeting?',
    bioTime: 'Tuesday',
    profilePicture: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    name: 'George Clooney',
    bio: 'Thanks for your help!',
    bioTime: 'Wednesday',
    profilePicture: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Hannah Montana',
    bio: 'I loved that movie!',
    bioTime: 'Thursday',
    profilePicture: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Ian Malcolm',
    bio: "Don't forget to bring the snacks.",
    bioTime: 'Friday',
    profilePicture: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Jessica Rabbit',
    bio: 'Can you believe what happened?',
    bioTime: '01/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    name: 'Kevin Hart',
    bio: "Let's catch up this weekend!",
    bioTime: '01/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    name: 'Luna Lovegood',
    bio: 'I found something interesting!',
    bioTime: '02/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    name: 'Michael Scott',
    bio: "That's what she said!",
    bioTime: '02/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    name: 'Nina Simone',
    bio: "Can't wait for our concert!",
    bioTime: '03/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    name: 'Oliver Twist',
    bio: 'Please, sir, I want some more.',
    bioTime: '30/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    bio: 'All you need is love.',
    bioTime: '04/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    bio: 'Please, sir, I want some more.',
    bioTime: '23/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    bio: 'All you need is love.',
    bioTime: '14/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    bio: 'Please, sir, I want some more.',
    bioTime: '01/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    bio: 'All you need is love.',
    bioTime: '20/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    bio: 'Please, sir, I want some more.',
    bioTime: '10/10/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    bio: 'All you need is love.',
    bioTime: '04/05/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    bio: 'Please, sir, I want some more.',
    bioTime: '06/09/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    bio: 'All you need is love.',
    bioTime: '05/03/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    bio: 'Please, sir, I want some more.',
    bioTime: '10/08/2024',
    profilePicture: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    bio: 'All you need is love.',
    bioTime: '14/02/2024',
    profilePicture: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
];

export interface ResponseData {
  id: number;
  bio: string;
  name: string;
  profilePicture: string;
}
