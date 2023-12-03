import "./App.css";

import Login from "./pages/Login/Login";
import Transaction from "./pages/TransactionView/Transaction";
import BorrowingForm from "./pages/student/borrowForm/BorrowingForm";
import RequestConfirm from "./pages/student/requestConfirm/RequestConfirm";
import BreakageView from "./pages/student/breakageView/breakageView";
import BreakageCompletedView from "./pages/student/breakageView/breakageCompletedView";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Store from "./components/Redux/Store/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Revalidator from "./components/Revalidator/Revalidator";

import Dashboard from "./pages/Dashboard/Dashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Student Views */}
            <Route
              path="/"
              element={
                <>
                  <Revalidator />
                  <Login />
                </>
              }
            />
            <Route
              path="/borrow-form"
              element={

                <>
                  <Revalidator />
                  <BorrowingForm />
                </>
              }
            />
            <Route
              path="/request-confirm"
              element={
                <>
                  <Revalidator />
                  <RequestConfirm />
                </>
              }
            />

            <Route
              path="/dashboard"
              element={
                <>
                  <Revalidator />
                  <Dashboard />
                </>
              }
            />

            <Route
              path="/Student/:status/Transaction/:id"
              element={
                <>
                  <Revalidator />
                  <Transaction />
                </>
              }
            />

            <Route
              path="/Breakage/view/:id"
              element={
                <>
                  <Revalidator />
                  <BreakageView />
                </>
              }
            />
            <Route
              path="/Resolved/view/:id"
              element={
                <>
                  <Revalidator />
                  <BreakageCompletedView />
                </>
              }
            />

            {/* Teacher Views*/}
            <Route
              path="/Teacher/Dashboard"
              element={
                <>
                  <Revalidator />
                  <BreakageCompletedView />
                </>
              }
            />
          </Routes>
        </Router>
      </QueryClientProvider>
      <ToastContainer
        position={"top-right"}
        autoClose={1500}
        closeOnClick
        pauseOnHover
        draggable
        theme={"light"}
        limit={3}
      />
    </Provider>
  );
}

export default App;
