import './App.css';
import BorrowingForm from './components/student/BorrowingForm';
import RequestConfirm from './components/student/requestConfirm/RequestConfirm';
import Login from './components/student/login/Login';
import DashboardScreen from './components/student/dashboard/dashboard';
import PendingView from './components/student/transactionView/pendingView';
import OnBorrowView from './components/student/transactionView/onBorrowView';
import ReturnCompletedView from './components/student/transactionView/returnCompletedView';
import ReturnCheckingView from './components/student/transactionView/returnCheckingView';
import BreakageView from './components/student/transactionView/breakageView';
import BreakageCompletedView from './components/student/transactionView/breakageCompletedView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RejectedView from './components/student/transactionView/rejectedView';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Dashboard from './components/teacher/Dashboard';
import TPendingView from './components/teacher/PendingView';
import TRejectedView from './components/teacher/RejectedView';
import TAcceptedView from './components/teacher/AcceptedView';

const queryClient = new QueryClient


function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
    <div className="App">
      
      <Routes>

          {/* Student Views */}
          <Route path="/" element={<Login/>} />
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