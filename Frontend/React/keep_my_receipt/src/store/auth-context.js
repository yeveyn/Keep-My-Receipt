// import React, { useState } from 'react';

// // login 이후 accessToken 저장소
// const AuthContext = React.createContext({
//   token: '',
//   isLoggedIn: false,
//   login: (token) => {},
//   logout: () => {},
// });

// //인증 관리 역할
// export const AuthContextProvider = (props) => {
//   const [token, setToken] = useState(null);

//   // 토큰이 잇으면 true, 토큰없으면 false 반환
//   const userIsLoggedIn = !!token;

//   // 토큰 상태 바꾸는 함수
//   const loginHandler = () => {
//     setToken(token);
//   };
//   const logoutHandler = () => {
//     setToken(null);
//   };

//   const contextValue = {
//     token: token,
//     isLoggedIn: userIsLoggedIn,
//     login: loginHandler,
//     logout: logoutHandler,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
