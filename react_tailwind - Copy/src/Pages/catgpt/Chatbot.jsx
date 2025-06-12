// import React, { useState, useEffect, useRef } from 'react';

// const Chatbot = () => {
//   const [message, setMessage] = useState('');
//   const [chatLog, setChatLog] = useState([]);
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatLog]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     setChatLog(prev => [...prev, { sender: 'user', text: message }]);
//     setMessage('');

//     try {
//       const response = await fetch('http://localhost:8000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message }),
//       });

//       const data = await response.json();
//       const botReply = data.response || 'Sorry, no response from AI.';

//       setChatLog(prev => [...prev, { sender: 'bot', text: botReply }]);
//     } catch (error) {
//       setChatLog(prev => [...prev, { sender: 'bot', text: 'Server error. Try again later.' }]);
//     }
//   };

//   const handleKeyDown = e => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div style={{
//       position: 'fixed',
//       bottom: 20,
//       right: 20,
//       width: 320,
//       maxHeight: 450,
//       boxShadow: '0 0 10px rgba(0,0,0,0.3)',
//       borderRadius: 10,
//       backgroundColor: '#fff',
//       display: 'flex',
//       flexDirection: 'column',
//       fontFamily: 'Arial, sans-serif',
//       zIndex: 1000,
//     }}>
//       <div style={{
//         backgroundColor: '#1976d2',
//         color: 'white',
//         padding: '10px 15px',
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         fontWeight: 'bold',
//         fontSize: 18,
//       }}>
//         Help Chat
//       </div>

//       <div style={{
//         flexGrow: 1,
//         overflowY: 'auto',
//         padding: 15,
//       }}>
//         {chatLog.length === 0 && (
//           <p style={{ color: '#666', fontSize: 14 }}>
//             Hi! Ask me anything about your order or our products.
//           </p>
//         )}
//         {chatLog.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               marginBottom: 10,
//               textAlign: msg.sender === 'user' ? 'right' : 'left',
//             }}
//           >
//             <span style={{
//               display: 'inline-block',
//               padding: '8px 12px',
//               borderRadius: 20,
//               backgroundColor: msg.sender === 'user' ? '#4caf50' : '#f1f0f0',
//               color: msg.sender === 'user' ? 'white' : 'black',
//               maxWidth: '75%',
//               wordBreak: 'break-word',
//             }}>
//               {msg.text}
//             </span>
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>

//       <div style={{ display: 'flex', borderTop: '1px solid #ddd', padding: 10 }}>
//         <input
//           type="text"
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your message..."
//           style={{
//             flexGrow: 1,
//             padding: 10,
//             borderRadius: 20,
//             border: '1px solid #ccc',
//             outline: 'none',
//             fontSize: 14,
//           }}
//         />
//         <button
//           onClick={sendMessage}
//           style={{
//             marginLeft: 8,
//             padding: '10px 15px',
//             borderRadius: 20,
//             border: 'none',
//             backgroundColor: '#1976d2',
//             color: 'white',
//             cursor: 'pointer',
//             fontWeight: 'bold',
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  const ecomKeywords = [
    'order', 'delivery', 'shipping', 'cart', 'checkout', 'return', 'refund', 'product', 'payment', 'invoice',
    'tracking', 'cancel', 'item', 'stock', 'purchase', 'discount', 'sale', 'price', 'offer', 'ecommerce'
  ];

  const isEcommerceQuery = (msg) => {
    const lower = msg.toLowerCase();
    return ecomKeywords.some(keyword => lower.includes(keyword));
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChatLog(prev => [...prev, { sender: 'user', text: userMessage }]);
    setMessage('');

    if (!isEcommerceQuery(userMessage)) {
      setChatLog(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "I'm here to help with queries related to our e-commerce platform. Please ask about orders, products, shipping, or returns.",
        },
      ]);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const botReply = data.response || 'Sorry, no response from AI.';
      setChatLog(prev => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      setChatLog(prev => [...prev, { sender: 'bot', text: 'Server error. Try again later.' }]);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 55,
            height: 55,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6a00, #ff0080)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2000,
            fontSize: 22,
            boxShadow: '0 0 15px rgba(255, 105, 180, 0.6), 0 8px 20px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.4s ease-in-out',
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{
            background: 'linear-gradient(135deg, #ff0080, #8e2de2)',
            boxShadow: '0 0 25px rgba(255, 105, 180, 0.8), 0 10px 25px rgba(0, 0, 0, 0.3)',
          }}
        >
          💬
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: '90%',
            maxWidth: 350,
            height: 500,
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            borderRadius: 20,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #ff6a00, #ff0080)',
              color: 'white',
              padding: '12px 16px',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              fontWeight: 'bold',
              fontSize: 18,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            Help Chat
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: 20,
                cursor: 'pointer',
              }}
            >
              ✖
            </button>
          </div>

          <div style={{ flexGrow: 1, overflowY: 'auto', padding: 15 }}>
            {chatLog.length === 0 && (
              <p style={{ color: '#666', fontSize: 14 }}>
                Hi! Ask me anything about your order, shipping, or returns.
              </p>
            )}
            {chatLog.map((msg, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 10,
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '8px 12px',
                    borderRadius: 20,
                    backgroundColor: msg.sender === 'user' ? '#ff5252' : '#f1f0f0',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    maxWidth: '75%',
                    wordBreak: 'break-word',
                    fontSize: 14,
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #ddd', padding: 10 }}>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              style={{
                flexGrow: 1,
                padding: 10,
                borderRadius: 20,
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: 14,
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                marginLeft: 8,
                padding: '10px 15px',
                borderRadius: 20,
                border: 'none',
                backgroundColor: '#ff5252',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background 0.3s ease',
              }}
              onMouseOver={e => (e.target.style.backgroundColor = '#ff1744')}
              onMouseOut={e => (e.target.style.backgroundColor = '#ff5252')}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;
