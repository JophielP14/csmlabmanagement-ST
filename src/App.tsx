import './App.css';

import Login from './components/login/Login';
import BorrowingForm from './pages/student/borrowForm/BorrowingForm';
import RequestConfirm from './pages/student/requestConfirm/RequestConfirm';
import DashboardScreen from './pages/student/dashboard/dashboard';
import BreakageView from './pages/student/breakageView/breakageView';
import BreakageCompletedView from './pages/student/breakageView/breakageCompletedView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dashboard from './pages/teacher/dashboard/Dashboard';

import STransaction from './pages/student/transactionView/Transaction';
import TTransaction from './pages/teacher/transactionView/Transaction';
import ForgotPassword from './pages/student/forgotpassword/ForgotPassword';



const queryClient = new QueryClient


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div className="App">
      
      <Routes>

          {/* Student Views */}
          <Route path="/" element={<Login />} />
          <Route path="/borrow-form" element={<BorrowingForm />} />
          <Route path='/request-confirm' element={<RequestConfirm />} />
          <Route path="/forgot-password" element = {<ForgotPassword />} />

          <Route path="/dashboard" element={<DashboardScreen />} />

          <Route path="/Student/:status/Transaction/:id" element={<STransaction/>} />

          <Route path="/pending" element={<DashboardScreen />} />
          <Route path="/on-borrow" element={<DashboardScreen/>} />
          <Route path="/returning" element={<DashboardScreen/>} />
          <Route path="/returned" element={<DashboardScreen/>} />
          <Route path="/completed" element={<DashboardScreen/>} />
          <Route path="/breakage" element={<DashboardScreen/>} />
          <Route path="/rejected" element={<DashboardScreen/>} />


          <Route path="/Breakage/view/:id" element={<BreakageView/>} />
          <Route path="/Resolved/view/:id" element={<BreakageCompletedView/>} />


          {/* Teacher Views*/}
          <Route path="/Teacher/Dashboard" element={<Dashboard />} />
          <Route path="/Teacher/transaction/:id" element={<TTransaction />} />

      </Routes>
    </div>

    </Router>
    </QueryClientProvider> 
  );
}

export default App 