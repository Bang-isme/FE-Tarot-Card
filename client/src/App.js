import {Routes,Route} from 'react-router-dom'
import { path } from './ultils/constant';
import {Home,Login} from './containers/Public'
function App() {
  return (
    <div className='h-screen w-screen bg-primary'>
      <Routes>
        <Route path={path.HOME} element={<Home/>}></Route>
        <Route path={path.LOGIN} element={<Login/>}></Route>
      </Routes>
    </div>

  )
}

export default App