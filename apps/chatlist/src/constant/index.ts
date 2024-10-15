export interface ChatCardMessage {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  profileImage: string;
  type?: 'Constant';
}

export const chatMessages: ChatCardMessage[] = [
  {
    name: 'Alice Johnson',
    lastMessage: 'Hey! Are we still on for dinner?',
    lastMessageTime: '10:15 AM',
    profileImage: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    name: 'Bob Smith',
    lastMessage: 'Just finished the report. Check it out!',
    lastMessageTime: '9:45 AM',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Charlie Brown',
    lastMessage: 'Can you send me the files?',
    lastMessageTime: '8:30 AM',
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'Diana Prince',
    lastMessage: 'Looking forward to our trip!',
    lastMessageTime: 'Yesterday',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    name: 'Ethan Hunt',
    lastMessage: 'Mission accomplished!',
    lastMessageTime: 'Monday',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Fiona Gallagher',
    lastMessage: 'Can we reschedule our meeting?',
    lastMessageTime: 'Tuesday',
    profileImage: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    name: 'George Clooney',
    lastMessage: 'Thanks for your help!',
    lastMessageTime: 'Wednesday',
    profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Hannah Montana',
    lastMessage: 'I loved that movie!',
    lastMessageTime: 'Thursday',
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    name: 'Ian Malcolm',
    lastMessage: "Don't forget to bring the snacks.",
    lastMessageTime: 'Friday',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    name: 'Jessica Rabbit',
    lastMessage: 'Can you believe what happened?',
    lastMessageTime: '01/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    name: 'Kevin Hart',
    lastMessage: "Let's catch up this weekend!",
    lastMessageTime: '01/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    name: 'Luna Lovegood',
    lastMessage: 'I found something interesting!',
    lastMessageTime: '02/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    name: 'Michael Scott',
    lastMessage: "That's what she said!",
    lastMessageTime: '02/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
  {
    name: 'Nina Simone',
    lastMessage: "Can't wait for our concert!",
    lastMessageTime: '03/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    name: 'Oliver Twist',
    lastMessage: 'Please, sir, I want some more.',
    lastMessageTime: '30/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    lastMessage: 'All you need is love.',
    lastMessageTime: '04/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    lastMessage: 'Please, sir, I want some more.',
    lastMessageTime: '23/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    lastMessage: 'All you need is love.',
    lastMessageTime: '14/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    lastMessage: 'Please, sir, I want some more.',
    lastMessageTime: '01/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    lastMessage: 'All you need is love.',
    lastMessageTime: '20/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    lastMessage: 'Please, sir, I want some more.',
    lastMessageTime: '10/10/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    lastMessage: 'All you need is love.',
    lastMessageTime: '04/05/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    lastMessage: 'Please, sir, I want some more.',
    lastMessageTime: '06/09/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    lastMessage: 'All you need is love.',
    lastMessageTime: '05/03/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
  {
    name: 'Oliver Twist',
    lastMessage: 'Please, sir, I want some more.',
    lastMessageTime: '10/08/2024',
    profileImage: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  {
    name: 'Penny Lane',
    lastMessage: 'All you need is love.',
    lastMessageTime: '14/02/2024',
    profileImage: 'https://randomuser.me/api/portraits/women/8.jpg',
  },
];

export interface ResponseData {
  id: number;
  bio: string;
  name: string;
  profilePicture: string;
}
