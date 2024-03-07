import { ToastItemType } from './types';

export const toastItems: Omit<ToastItemType, 'id'>[] = [
  {
    title: 'I am a simple toast',
  },
  {
    title: 'Well, not so simple',
  },
  {
    title: 'You can swipe me',
  },
  {
    title: 'You can add a subtitle',
    subTitle: 'Here i am',
  },
];
