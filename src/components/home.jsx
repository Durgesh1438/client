
import React, { useEffect, useState } from 'react';
import './../App.css'
import axios from 'axios';
import { useUsername } from '../globalstate/globalstate';
function Home(){
    const {user}=useUsername()
  const [recipient, setRecipient] = useState(null);
  const [subject, setSubject] = useState(null);
  const [message, setMessage] = useState(null);
  const [submitform,setsubmitform]=useState(false)
  const [activeTab, setActiveTab] = useState('sent');
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const fetchEmails = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const receivedRes = await axios.get('http://localhost:5000/user/received-emails', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(receivedRes.data)
      setReceivedEmails(receivedRes.data);

      const sentRes = await axios.get('http://localhost:5000/user/sent-emails', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(sentEmails)
      setSentEmails(sentRes.data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };
  useEffect(() => {
    fetchEmails();
  }, [activeTab]);

  const sendEmail = async () => {
    try {
      const emailData = { recipient, subject, message };
      const token = sessionStorage.getItem('access_token');
      const res = await axios.post('http://localhost:5000/user/send-email', emailData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Email sent:', res.data);

      // Clear form fields after successful submission
      setRecipient(null);
      setSubject(null);
      setMessage(null);
      fetchEmails()
      setSentEmails([...sentEmails, { Recipients: recipient, Subject: subject, ReceivedAt: new Date().toDateString() }])
      console.log("sending emailing logs")
      console.log([...sentEmails, { Recipients: recipient, Subject: subject, ReceivedAt: new Date().toDateString() }])
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="App">
      <div className="user-dashboard">
        <h1>Welcome, {user.Email}!</h1>
        <div className="email-section">
          <div className="tabs">
            <button
              className={activeTab === 'received' ? 'active' : ''}
              onClick={() => setActiveTab('received')}
            >
              Received Emails
            </button>
            <button
              className={activeTab === 'sent' ? 'active' : ''}
              onClick={() => setActiveTab('sent')}
            >
              Sent Emails
            </button>
          </div>
          </div>
          <div className="email-list">
            {activeTab === 'received' && (
              <div>
                <h2>Received Emails</h2>
                <ul>
                  {receivedEmails.map((email, index) => (
                    <li key={index}>
                      <strong>From:</strong> {email.From}<br />
                      <strong>Subject:</strong> {email.Subject}<br />
                      <strong>Date:</strong> {new Date(email.Date).toDateString()}<br />
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'sent' && (
              <div>
                <h2>Sent Emails</h2>
                <ul>
                  {sentEmails.map((email, index) => (
                    <li key={index}>
                      <strong>To:</strong> {email.Recipients}<br />
                      <strong>Subject:</strong> {email.Subject}<br />
                      <strong>Date:</strong> {new Date(email.ReceivedAt).toDateString()}<br />
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        <div className="send-email-section">
          <h2>Send Email</h2>
          <form onSubmit={(e) => {  sendEmail(); }}>
            <input
              type="email"
              placeholder="Recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Home;