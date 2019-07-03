import React from "react";
import {
  BrowserRouter as Router
  // Route,
  // Link,
  // Redirect,
  // withRouter
} from "react-router-dom";
import "react-bulma-components/dist/react-bulma-components.min.css";
import Routes from "./components/Routes";

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100);
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// const AuthButton = withRouter(({ history }) =>
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome!
//       <button
//         type="button"
//         onClick={() => {
//           fakeAuth.signout(() => {
//             history.push("/");
//           });
//         }}
//       >
//         Logout
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   )
// );

// const Login = () => {
//   const [redirectToReferrer, setRedirectToReferrer] = useState(false);

//   const login = () => {
//     fakeAuth.authenticate(() => {
//       setRedirectToReferrer(true);
//     });
//   };

//   if (redirectToReferrer === true) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <div>
//       <h1>Login</h1>

//       <button type="button" onClick={login}>
//         Login
//       </button>
//     </div>
//   );
// };

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
