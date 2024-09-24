import React, { useEffect, useRef, useState } from 'react';
import styles from "../../styles/register.module.css";
import { AuthResponse} from '../../api/registerApi';
import { VerificationRequest, verifyCodeApi } from '../../api/verifyCodeApi';
import { loginService, UserDetailsResponse } from '../../api/loginService';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux'; 
import { RootState } from '../../api/store';
import { setUser } from '../../api/slices/userSlice';
import axios from '../../api/axios';
import { FaFingerprint } from 'react-icons/fa';

const Login: React.FC = () => {
  const{loginApi}= loginService()
  const errRef = useRef<HTMLParagraphElement>(null);
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const[userResponse, setUserResponse]= useState<UserDetailsResponse | null>(null);
  const [validationCode, setValidtionCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  
  useEffect(() => {
    setIsButtonDisabled(validationCode.length !== 6);
  }, [validationCode]);

  const [customMessage, setCustomMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setEmail(email);
    console.log("credentials", email, password);
    try {
      const response = await loginApi(email, password);
      console.log("this is auth response", response);
      setAuthResponse(response);
      

      const accessToken=response.token;
      
      const userDetailsResponse = await axios.get('/api/v1/user/details', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const userDetails = userDetailsResponse.data
      dispatch(login({...userDetails,accessToken}));
      dispatch(setUser(userDetails));
      

      if (response.mfaEnabled !== true) {
        setCustomMessage('Login successful!, You are logged in. Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard'}, 2000)
      }
     
    } catch (err  : any) {
      if (!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      if (errRef.current) errRef.current.focus();
  }
  
  };

  const handleVerify = async () => {
    try {
      const verify = await verifyCodeApi(email, validationCode);
      setVerificationRequest(verify);
      setCustomMessage('Login successful!, You are logged in. Redirecting...');
      setTimeout(() => {
        window.location.href = '/dashboard'}, 2000)
    } catch (error) {
      setError('Verification failed');
      console.error('Error verifying code', error);
    }
  };

  useEffect(() => {}, [isAuthenticated]);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

//   return (
//     <div className={styles.Login}>
//         {customMessage ? (
//           <section >
//             <h2 className={styles.success}>{customMessage}</h2>
//           </section>
//         ) : (
//           <div className={styles.RegContainer}>
//             <div className={styles.LogoWrapper}> 
//                 <Link to={"/"}>
//                     <div > 
//                         <FaFingerprint/>
//                         <span>Smart Memo</span>
//                     </div> 
//                 </Link>
//               </div>
//       <section className={styles.sectionReg}>
        
//       <p
//               ref={errRef}
//               className={errMsg ? styles.errmsg : styles.offscreen}
//               aria-live="assertive"
//             >
//               {errMsg}
//             </p>
//         <h1>Login</h1>
//         <form action="login" className={styles.formReg} onSubmit={handleSubmit}>
//           <label htmlFor="email">Email: </label>
//           <input
//             className={styles.inputReg}
//             type="email"
//             id="email"
//             autoComplete="off"
//             name="email"
//             required
//           />
//           <label htmlFor="password">Password: </label>
//           <input
//             className={styles.inputReg}
//             type="password"
//             id="password"
//             name="password"
//             required
//           />
//            <div style={{display:"flex", justifyContent:"right", alignItems:"right", width:"100%"}}>
//                   <a
//                       href="/forgotPassword"
//                       onClick={() => setShowForgotPassword(true)}
//                     >
//                       Forgot Password?
//                     </a>
//               </div>
//           <button type="submit" className={styles.buttonReg}>
//             Sign In
//           </button>
//           <p>
//                     Need an Account?
//                     <span>
//                         <Link to="/register">Sign up</Link>
//                     </span>
//                 </p>
          
                
//         </form>
//       </section>
      
      
//     </div>
    
      
//         )}
//         {authResponse && authResponse.mfaEnabled && (
//       <div>
//         <h2>Two-Factor Authentication</h2>
//         <div>
//           <label>Enter 6 digits Validation Code Generated by the app: </label>
//           <input 
//             type="text"
//             id="validationCode"
//             name="validationCode"
//             required
//             onChange={(e) => setValidtionCode(e.target.value)}
//           />
//           <button
//             type='button'
//             className={styles.ButtonStyle}
//             disabled={isButtonDisabled}
//             onClick={handleVerify}
//           >Verify code
//           </button>
//         </div>
//       </div>
//     )} 
//     </div>
//   )
// };

// export default Login;

return (
  <div className={styles.cover}>
    <div className={styles.Login}>
      {/* If custom message is present, show it */}
      {customMessage ? (
        <section>
          <h2 className={styles.success}>{customMessage}</h2>
        </section>
      ) : (
        // Only show the login form if MFA is not enabled
        !authResponse?.mfaEnabled && (
          <div className={styles.LoginContainer}>
            <div className={styles.LogoWrapper}>
              <Link to="/">
                <div>
                  <FaFingerprint />
                  <span>Smart Memo</span>
                </div>
              </Link>
            </div>

            <section className={styles.sectionLogin}>
              <p
                ref={errRef}
                className={errMsg ? styles.errmsg : styles.offscreen}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <div className={styles.name}>Login</div>
              <form action="login" className={styles.formReg} onSubmit={handleSubmit}>
                <label  className={styles.regLabel}htmlFor="email">Email: </label>
                <input
                  className={styles.inputReg}
                  type="email"
                  id="email"
                  autoComplete="off"
                  name="email"
                  required
                />
                <label className={styles.regLabel} htmlFor="password">Password: </label>
                <input
                  className={styles.inputReg}
                  type="password"
                  id="password"
                  name="password"
                  required
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "right",
                    width: "100%",
                  }}
                >
                  <Link to="/forgotPassword">Forgot Password?</Link>
                </div>
                <button type="submit" className={styles.buttonReg}>
                  Sign In
                </button>
                <p>
                  Need an Account?
                  <span>
                    <Link to="/register">Sign up</Link>
                  </span>
                </p>
              </form>
            </section>
          </div>
        )
      )}

      {/* Show the MFA section only if MFA is enabled */}
      {authResponse && authResponse.mfaEnabled && (
        <div style={{color:'white'}}>
          <h2 className={styles.name}>Two-Factor Authentication</h2>
          <div>
            <label className={styles.regLabel}>Enter 6-digit Validation Code Generated by the app: </label>
            <input
              type="text"
              id="validationCode"
              name="validationCode"
              value={validationCode}
              onChange={(e) => setValidtionCode(e.target.value)}
              required
            />
            <button
              type="button"
              className={styles.ButtonStyle}
              disabled={isButtonDisabled}
              onClick={handleVerify}
            >
              Verify Code
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
);
};
export default Login;