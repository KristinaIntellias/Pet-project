import {Article} from "../models/article.model";

export const articles: Article[] = [
  {
    _id: '1',
    author: {
      _id: '61da9d850a08dbf7f4f7ae54',
      firstName: 'Vasya',
      lastName: 'Pupkin',
      email: 'example@gmail.com',
      password: '123456'
    },
    date: Date.now(),
    title: 'NATURAL LANGUAGE INTERFACE ACCESSIBILITY',
    description: 'Spoken interaction with mobile devices and consumer',
    usersLikeId: [],
    tags: ['test'],
    isOwner: false
    },
  {
    _id: '2',
    author: {
      _id: '61da9d850a08dbf7f4f7ae23',
      firstName: 'Vasya',
      lastName: 'Ivanov',
      email: 'example2@gmail.com',
      password: '123456'
    },
    date: Date.now(),
    title: 'Accessibility of Remote Meetings',
    description: 'The impact of COVID-19 has seen a substantial increase',
    usersLikeId: [],
    isOwner: false,
  },
]

export const article: Article = {
  _id: '3',
  author: {
    _id: '61da9d850a08dbf7f4f7ae54',
    firstName: 'Masha',
    lastName: 'Sydorova',
    email: 'example@gmail.com',
    password: '123456'
  },
  date: Date.now(),
  title: 'NATURAL LANGUAGE INTERFACE ACCESSIBILITY',
  description: 'Spoken interaction with mobile devices and consumer',
  usersLikeId: [],
  isOwner: false
};
