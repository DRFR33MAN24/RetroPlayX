const beer = require('./Screens/images/beer.jpg');
const dating = require('./Screens/images/dating.jpg');
const ikea = require('./Screens/images/dating.jpg');
const shampoo = require('./Screens/images/dating.jpg');
export const games = [
  {
    id: 1,
    title: "Super Mario Bros",
    details: "Super Mario is a platform game series created by Nintendo starring their mascot, Mario. Alternatively called the Super Mario Bros. series or simply the Mario series, it is the central series of the greater Mario franchise. At least one Super Mario game has been released for every major Nintendo video game console ",
    system: "NES",
    image: "https://picsum.photos/200",
    link: "https://picsum.photos/200",
    downloads: 2111,
    rating: 5,
    size: 1
  },
  {
    id: 1,
    title: "Super Mario Bros",
    details: "Super Mario is a platform game series created by Nintendo starring their mascot, Mario. Alternatively called the Super Mario Bros. series or simply the Mario series, it is the central series of the greater Mario franchise. At least one Super Mario game has been released for every major Nintendo video game console ",
    system: "NES",
    image: "https://picsum.photos/200",
    link: "https://picsum.photos/200",
    downloads: 2111,
    rating: 5,
    size: 1
  },
  {
    id: 1,
    title: "Super Mario Bros",
    details: "Super Mario is a platform game series created by Nintendo starring their mascot, Mario. Alternatively called the Super Mario Bros. series or simply the Mario series, it is the central series of the greater Mario franchise. At least one Super Mario game has been released for every major Nintendo video game console ",
    system: "NES",
    image: "https://picsum.photos/200",
    link: "https://picsum.photos/200",
    downloads: 2111,
    rating: 5,
    size: 1
  },
  {
    id: 1,
    title: "Super Mario Bros",
    details: "Super Mario is a platform game series created by Nintendo starring their mascot, Mario. Alternatively called the Super Mario Bros. series or simply the Mario series, it is the central series of the greater Mario franchise. At least one Super Mario game has been released for every major Nintendo video game console ",
    system: "NES",
    image: "https://picsum.photos/200",
    link: "https://picsum.photos/200",
    downloads: 2111,
    rating: 5,
    size: 1
  },
  {
    id: 1,
    title: "Super Mario Bros",
    details: "Super Mario is a platform game series created by Nintendo starring their mascot, Mario. Alternatively called the Super Mario Bros. series or simply the Mario series, it is the central series of the greater Mario franchise. At least one Super Mario game has been released for every major Nintendo video game console ",
    system: "NES",
    image: "https://picsum.photos/200",
    link: "https://picsum.photos/200",
    downloads: 2111,
    rating: 5,
    size: 1
  },

]
export const surveysData = [
  {
    id: 1,
    name: 'Beat Beer ',
    coins: 100,
    details:
      'Help a famous beer company choose the right beverage to customers',
    imageUri: beer,
    timeToComplete: '5 min',
    animated: false,
  },
  {
    id: 2,
    name: 'Pick your\nbest partner',
    coins: 550,
    details: 'Help a famous dating company choose the right soulmate for you',
    imageUri: dating,
    timeToComplete: '15 min',
    animated: false,
  },
  {
    id: 1,
    name: 'Beat Beer ',
    coins: 100,
    details:
      'Help a famous beer company choose the right beverage to customers',
    imageUri: beer,
    timeToComplete: '5 min',
    animated: false,
  },
  {
    id: 2,
    name: 'Pick your\nbest partner',
    coins: 550,
    details: 'Help a famous dating company choose the right soulmate for you',
    imageUri: dating,
    timeToComplete: '15 min',
    animated: false,
  },
  {
    id: 1,
    name: 'Beat Beer ',
    coins: 100,
    details:
      'Help a famous beer company choose the right beverage to customers',
    imageUri: beer,
    timeToComplete: '5 min',
    animated: false,
  },
  {
    id: 2,
    name: 'Pick your\nbest partner',
    coins: 550,
    details: 'Help a famous dating company choose the right soulmate for you',
    imageUri: dating,
    timeToComplete: '15 min',
    animated: false,
  },
  {
    id: 1,
    name: 'Beat Beer ',
    coins: 100,
    details:
      'Help a famous beer company choose the right beverage to customers',
    imageUri: beer,
    timeToComplete: '5 min',
    animated: false,
  },
  {
    id: 2,
    name: 'Pick your\nbest partner',
    coins: 550,
    details: 'Help a famous dating company choose the right soulmate for you',
    imageUri: dating,
    timeToComplete: '15 min',
    animated: false,
  },
  {
    id: 1,
    name: 'Beat Beer ',
    coins: 100,
    details:
      'Help a famous beer company choose the right beverage to customers',
    imageUri: beer,
    timeToComplete: '5 min',
    animated: false,
  },
  {
    id: 2,
    name: 'Pick your\nbest partner',
    coins: 550,
    details: 'Help a famous dating company choose the right soulmate for you',
    imageUri: dating,
    timeToComplete: '15 min',
    animated: false,
  },
];

export const offersData = [
  {
    id: 2,
    name: 'Signup',
    os: 'android',
    type: 'PIN Submit',
    coins: 200,
    conversion: 'register in the site and verify email',
    imageUri: 'http://localhost:5000/offer/1',
    link: 'http://localhost:5000/offer/link/1',
  },
  {
    id: 2,
    name: 'Install this game farm warriors ',
    os: 'android',
    type: 'install',
    coins: 100,
    conversion: 'reach level 20 in 10 days',
    imageUri: 'http://localhost:5000/offer/2',
    link: 'http://localhost:5000/offer/link/2',
  },
];

export const transactions = [
  {
    id: 1,
    type: 'prepaid visa',
    state: 'pending',
    amount: -5.0,
    submitDate: '12/09/2022',
  },
  {
    id: 2,
    type: 'paypal',
    state: 'rejected',
    amount: -5.0,
    submitDate: '12/09/2022',
  },
  {
    id: 3,
    type: 'BTC',
    state: 'approved',
    amount: -5.0,
    submitDate: '12/09/2022',
  },
];

export const notifications = [
  {
    id: 1,
    title: 'A new offer is available for you!',
    message: 'check the new IKEA products available in the nearest store',
    img: ikea,
    read: false,
  },
  {
    id: 2,
    title: 'Shampoo and body lotion ',
    message: 'get extra credits for submitting you info',
    img: shampoo,
    read: true,
  },
];

export const profile = {
  name: 'Martin Mystery',
  email: 'martin@gmail.com',
  membership: 'starter',
  totalEarnings: 55000,
  referralCode: 'RTXX44GG',
};
