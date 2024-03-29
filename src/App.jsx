import { BrowserRouter, Routes, Route, Navigate, useParams, } from 'react-router-dom'
import './App.css'
import AuthForm from './pages/account/AuthForm'
import Dashboard from './pages/adminpanel/Dashboard'
import UsersList from './pages/adminpanel/UsersList'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import StudRegister from './pages/account/StudRegister'
import ProvRegister from './pages/account/ProvRegister'
import CheckAuth from './utilities/CheckAuth'
import Profile from './pages/adminpanel/Profile'
import Courses from './pages/adminpanel/Courses'
import Plans from './pages/adminpanel/Plans'
import Providers from './pages/adminpanel/Providers'
import ProviderHome from './pages/providers/ProviderHome'
import ProviderDashboard from './pages/providers/ProviderDashboard'
import ProviderProfile from './pages/providers/ProviderProfile'
import ProviderCourses from './pages/providers/ProviderCourses'
import ProviderPlan from './pages/providers/ProviderPlan'
import ProviderQuestions from './pages/providers/ProviderQuestions'
import StudentPage from './pages/students/StudentPage'
import StudHome from './pages/students/StudHome'
import StudProfile from './pages/students/components/StudProfile'
import CourseDetails from './pages/partials/CourseDetails'
import StudCourses from './pages/students/StudCourses'
import User from './pages/adminpanel/User'
import Lesson from './pages/partials/Lesson'
import FullCourse from './pages/partials/FullCourse'
import StudProfilePage from './pages/students/StudProfilePage'
import MyCourses from './pages/students/components/MyCourses'
import FavoriteCourses from './pages/students/components/FavoriteCourses'
import SavedLesson from './pages/students/components/SavedLesson'
import QandA from './pages/students/components/QandA'
import Certificates from './pages/students/components/Certificates'
import PageLayout from './pages/partials/PageLayout'
import Quiz from './pages/partials/Quiz'
import PDFCertificate from './pages/students/components/PDFCertificate'
import PageNotFound from './pages/partials/PageNotFound'





function App() {

  const adminMenuItems = ['dashboard' , 'courses' , 'users' ,'plans' , 'profile']
  const providerMenuItems = ['dashboard' , 'courses' , 'questions' , 'plans' , 'profile']
  const {course_id} = useParams()

  return (
    <>
      <BrowserRouter>
      {console.log('testinggggg')}
      <Routes>
          {/* Admin Routes ..testing */}
          <Route path='/account' exact element={<AuthForm />}>
            <Route index element={<Navigate to='login' />} ></Route>
            <Route path='login' exact element={<CheckAuth role={"login"} from={'login'}><Login /></CheckAuth>}></Route>
            <Route path='register' exact element={<Register />}>
              <Route index element={<Navigate to='student' />} ></Route>
              <Route path='student' exact element={<StudRegister />}></Route>
              <Route path='provider' exact element={<ProvRegister />}></Route>
            </Route>
          </Route>
          <Route path='/admin' exact element={<CheckAuth from={'admin'}><PageLayout menus={adminMenuItems} /></CheckAuth>}>
            <Route index element={<Navigate to='dashboard' />} ></Route>
            <Route path='dashboard' exact element={<Dashboard />}></Route>
            <Route path='courses' exact element={<Courses />}></Route>
            <Route path='courses/:course_id' exact element={<CourseDetails is_provider={false}/>}/>
            <Route path='users' exact element={<UsersList />}></Route>
            <Route path='users/:user_id' exact element={<User />}></Route>
            <Route path='providers' exact element={<Providers />}></Route>
            <Route path='plans' exact element={<Plans />}></Route>
            <Route path='profile' exact element={<Profile />}></Route>
          </Route>

          <Route path='/provider' exact element={<CheckAuth from={'provider'}><PageLayout menus={providerMenuItems} /></CheckAuth>}>
            <Route index element={<Navigate to='dashboard' />} ></Route>
            <Route path='home' exact element={<Navigate to='/provider/dashboard' />}></Route>
            <Route path='dashboard' exact element={<ProviderDashboard />}></Route>
            <Route path='profile' exact element={<ProviderProfile />}></Route>
            <Route path='course/:course_id' exact element={ <FullCourse />}>
              <Route index element={<Navigate to={'/provider/courses'}/>}></Route>
              <Route path='lesson/:lesson_id' exact element={<Lesson />}></Route>
            </Route>
            <Route path='courses' exact element={<ProviderCourses />}></Route>
            <Route path='courses/:course_id/quiz/' exact element={<Quiz />}></Route>
            <Route path='courses/:course_id' exact element={<CourseDetails is_provider={true}/>}/>
            <Route path='plans' exact element={<ProviderPlan />}></Route>
            <Route path='questions' exact element={<ProviderQuestions />}></Route>
          </Route>

          <Route path='/student' exact element={<CheckAuth from={'student'}><StudentPage /></CheckAuth>}>
            <Route index element={<Navigate to='home' />} ></Route>
            <Route path='home' exact element={<StudHome />}></Route>
            <Route path='course/:course_id' exact element={ <FullCourse />}>
              <Route index element={<Navigate to={'/studnet/courses'}/>}></Route>
              <Route path='lesson/:lesson_id' exact element={<Lesson />}></Route>
            </Route>
            <Route path='courses' exact element={<StudCourses />}></Route>
            <Route path='courses/:course_id' exact element={<CourseDetails is_provider={false}/>}/>
            <Route path='quiz/:course_id' exact element={<Quiz />}></Route>
            <Route path='profile/' exact element={<StudProfilePage />}>
              <Route index element={<Navigate to={'/student/profile/account'}/>}></Route>
              <Route path='account' exact element={<StudProfile />}></Route>
              <Route path='my_course' exact element={<MyCourses />}></Route>
              <Route path='favorite_courses' exact element={<FavoriteCourses />}></Route>
              <Route path='saved_lessons' exact element={<SavedLesson />}></Route>
              <Route path='QAAs' exact element={<QandA />}></Route>
              <Route path='certificates' exact element={<Certificates />}></Route>
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound />} />
          
      </Routes>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
 
    </BrowserRouter>
    </>
  )
}

export default App
