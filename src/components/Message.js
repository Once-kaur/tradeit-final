// import React from "react";

// const Message = () => {
//   return (
//     <div className={`chat-bubble`}>
//       <img className="chat-bubble__left" src="" alt="user avatar" />
//       <div className="chat-bubble__right">
//         <p className="user-name">Timonwa Akintokun</p>
//         <p className="user-message">
//           We are building a real time chat app with React and Firebase.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Message;
import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};
export default Message;