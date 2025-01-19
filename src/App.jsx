import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './App.css'; // นำเข้าไฟล์ CSS

const App = () => {
  const [accBalance, setAccBalance] = useState(10000);
  const [withDrawAmount, setWithDrawAmount] = useState('');
  const [history, setHistory] = useState([]);

  const withDraw = (amount) => {
    if (isNaN(amount) || amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'ข้อมูลไม่ถูกต้อง',
        text: 'กรุณากรอกจำนวนเงินที่ถูกต้อง',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    if (amount > accBalance - 1) {
      Swal.fire({
        icon: 'error',
        title: 'ถอนเงินไม่สำเร็จ',
        text: 'จำนวนเงินไม่เพียงพอ หรือระบบไม่อนุญาตให้ถอนหมดบัญชี',
        confirmButtonText: 'ตกลง',
      });
      return;
    }

    const newHistory = [...history, { amount, amountAfter: accBalance - amount }];
    setAccBalance((prevBalance) => prevBalance - amount);
    setHistory(newHistory);

    Swal.fire({
      icon: 'success',
      title: 'ถอนเงินสำเร็จ',
      text: 'ทำการถอนเงินเสร็จสิ้น',
      confirmButtonText: 'ตกลง',
    });

    setWithDrawAmount('');
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">โปรแกรมถอนเงิน</h1>
        <p className="balance">ยอดเงินคงเหลือ: <span>{accBalance} บาท</span></p>

        <div className="form">
          <input
            type="number"
            value={withDrawAmount}
            onChange={(e) => setWithDrawAmount(e.target.value)}
            className="input"
            placeholder="กรอกจำนวนเงินที่ต้องการถอน"
          />
          <button className="button" onClick={() => withDraw(parseInt(withDrawAmount))}>
            ถอนเงิน
          </button>
        </div>

        <h3 className="history-title">ประวัติการถอนเงิน</h3>
        <ul className="history-list">
          {history.length === 0 ? (
            <p className="no-history">ยังไม่มีประวัติการถอนเงิน</p>
          ) : (
            history.map((entry, index) => (
              <li key={index} className="history-item">
                <span>ถอนเงิน: {entry.amount} บาท</span>
                <span>เงินคงเหลือ: {entry.amountAfter} บาท</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
