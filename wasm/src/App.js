import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/layout/RootLayout'
import HomePage from './pages/Home'
import KoreanPage, { loader as koreanLoader } from './pages/korean/Korean'
import ForeignPage, { loader as foreignLoader } from './pages/foreign/Foreign'
import EventIssuePage, { loader as eventLoader } from './pages/event/EventIssue'
import LoginPage, { loader as loginLoader } from './pages/login/Login'
import KoreanDetailPage, {
  loader as koreanDetailLoader,
} from './pages/korean/KoreanDetail'
import CommunityLayout from './pages/layout/CommunityLayout'
import NewPostPage from './pages/NewPost'
import { action as manipulatePostAction } from './components/PostForm'
import ForeignDetailPage, {
  loader as foreignDetailLoader,
} from './pages/foreign/ForeignDetail'
import { action as loginAction } from './components/login/SignUp'
import RegisterPage, { loader as registerLoader } from './pages/login/Register'
import { action as commentAction } from './components/community/CommunityComments'
import EventIssueDetailPage, {
  loader as eventDetailLoader,
} from './pages/event/EventIssueDetail'
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'korean',
        element: <CommunityLayout />,
        children: [
          {
            index: true,
            id: 'korean',
            element: <KoreanPage />,
            loader: koreanLoader,
          },
          {
            path: ':id',
            id: 'korean-detail',
            loader: koreanDetailLoader,

            children: [
              {
                index: true,
                element: <KoreanDetailPage />,
                action: commentAction,
              },
            ],
          },
        ],
      },

      {
        path: 'foreign',
        element: <CommunityLayout />,
        children: [
          {
            index: true,
            id: 'foreign',
            element: <ForeignPage />,
            loader: foreignLoader,
          },
          {
            path: ':id',
            id: 'foreign-detail',
            loader: foreignDetailLoader,

            children: [
              {
                index: true,
                element: <ForeignDetailPage />,
                action: commentAction,
              },
            ],
          },
        ],
      },
      { path: 'new', element: <NewPostPage />, action: manipulatePostAction },
      {
        path: 'event-issue',
        children: [
          {
            index: true,
            element: <EventIssuePage />,
            id: 'event',
            loader: eventLoader,
          },
          {
            path: ':id',
            id: 'event-detail',
            element: <EventIssueDetailPage />,
            loader: eventDetailLoader,
            action: commentAction,
          },
        ],
      },
      {
        path: 'login',
        children: [
          {
            index: true,
            element: <LoginPage />,
            id: 'login',
            loader: loginLoader,
          },
          {
            path: 'register',
            element: <RegisterPage />,
            loader: registerLoader,
            action: loginAction,
          },
        ],
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
