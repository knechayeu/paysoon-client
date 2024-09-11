import { createBrowserRouter } from 'react-router-dom';
import { Rooms, NewRoom, Profile, Room, Friends, CreateTransaction } from '../pages';
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
    element: <Friends />,
  },
  {
    path: `${ERouter.Room}/:id`,
    element: <Room />,
  },
  {
    path: ERouter.CreateTransaction,
    element: <CreateTransaction />,
  },
]);
