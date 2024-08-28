import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Rooms, NewRoom, Profile } from '../pages';
import { ERouter } from '../enums';

export const router = createBrowserRouter([
  {
    path: ERouter.Rooms,
    element: <Rooms />,
  },
  {
    path: ERouter.Profile,
    element: <Profile />,
  },
  {
    path: ERouter.CreateRoom,
    element: <NewRoom />,
  },
  {
    path: ERouter.Friends,
    element: <Profile />,
  },
]);
