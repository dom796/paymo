import React, {useState} from 'react';
import './App.css';
import Button from "./shared/ui/Button/Button";
import PaymentModal from "./components/PaymentModal/PaymentModal";
import {Route, Routes} from 'react-router-dom';
import PaymentResult from "./components/PaymentResult/PaymentResult";

function App() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
  return (
    <div className="App">
      <header className="App-header">
        <Button
            text="Open modal"
            onClick={openModal}
            className="custom-button"
        />
          <PaymentModal
              isOpen={isModalOpen}
              onClose={closeModal}
              initiator="Иван.К"
              collectionName="Экскурсия"
          />
          <Routes>
              <Route path="/payment-result" element={<PaymentResult />} />
          </Routes>
      </header>
    </div>
  );
}

export default App;
