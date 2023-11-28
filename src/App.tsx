import './App.css';

import Login from './pages/screens/student/login/Login';
import BorrowingForm from './pages/screens/student/borrowForm/BorrowingForm';
import RequestConfirm from './pages/screens/student/requestConfirm/RequestConfirm';
import DashboardScreen from './pages/screens/student/dashboard/dashboard';
import PendingView from './pages/screens/student/transactionView/pendingView';
import OnBorrowView from './pages/screens/student/transactionView/onBorrowView';
import BreakageView from './pages/screens/student/transactionView/breakageView';
import BreakageCompletedView from './pages/screens/student/transactionView/breakageCompletedView';
import ReturnCheckingView from './pages/screens/student/transactionView/returnCheckingView';
import ReturnCompletedView from './pages/screens/student/transactionView/returnCompletedView';
import RejectedView from './pages/screens/student/transactionView/rejectedView';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dashboard from './pages/screens/teacher/teacherDashboard/Dashboard';
import TPendingView from './pages/screens/teacher/teacherPendingView/PendingView';
import TRejectedView from './pages/screens/teacher/teacherRejectedView/RejectedView';
import TAcceptedView from './pages/screens/teacher/teacherAcceptedView/AcceptedView';
import Transaction from './pages/screens/student/transactionView/Transaction';





const queryClient = new QueryClient


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div className="App">
      
      <Routes>

          {/* Student Views */}
          <Route path="/" element={<Transaction />} />
          <Route path="/borrow-form" element={<BorrowingForm />} />
          <Route path='/request-confirm' element={<RequestConfirm />} />

          <Route path="/dashboard" element={<DashboardScreen />} />

          <Route path="/pending" element={<DashboardScreen />} />
          <Route path="/on-borrow" element={<DashboardScreen/>} />
          <Route path="/returning" element={<DashboardScreen/>} />
          <Route path="/returned" element={<DashboardScreen/>} />
          <Route path="/completed" element={<DashboardScreen/>} />
          <Route path="/breakage" element={<DashboardScreen/>} />
          <Route path="/rejected" element={<DashboardScreen/>} />


          <Route path="/Pending/view/:id" element={<PendingView/>} />
          <Route path="/On-borrow/view/:id" element={<OnBorrowView/>} />
          <Route path="/Breakage/view/:id" element={<BreakageView/>} />
          <Route path="/Resolved/view/:id" element={<BreakageCompletedView/>} />

          <Route path="/Approved/view/:id" element={<OnBorrowView/>} />
          <Route path="/Returning/view/:id" element={<ReturnCheckingView/>} />
          <Route path="/Completed/view/:id" element={<ReturnCompletedView/>} />
          <Route path="/Rejected/view/:id" element={<RejectedView/>} />


          {/* Teacher Views*/}
          <Route path="/Teacher/Dashboard" element={<Dashboard />} />
          <Route path="/Teacher/transaction/:id" element={<TPendingView />} />
          <Route path="/Teacher/transaction/rejected/:id" element={<TRejectedView />} />
          <Route path="/Teacher/transaction/accepted/:id" element={<TAcceptedView />} />

      </Routes>
    </div>

    </Router>
    </QueryClientProvider> 
  );
}

export default App 