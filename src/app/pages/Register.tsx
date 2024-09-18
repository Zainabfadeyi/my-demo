import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../../styles/register.module.css";
import { registerApi, AuthResponse } from '../../api/registerApi';
import { verifyCodeApi, VerificationRequest } from '../../api/verifyCodeApi';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../api/hook';
import SignatureCanvas from 'react-signature-canvas';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USERLASTNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register: React.FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const userNameRef=useRef<HTMLInputElement>(null);

  const [validName, setValidName] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);
  const [userNameFocus, setUserNameFocus] = useState<boolean>(false);
  const [lastNameFocus, setLastNameFocus] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
 
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [userName , setUserName]= useState<string>('')
  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [role, setRole] = useState<string>('USER');

  const [errMsg, setErrMsg] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
    const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
    const [error, setError] = useState("");
    const [mfaEnabled, setMfaEnabled] = useState(false);
    const [validationCode, setValidationCode] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [verificationRequest, setVerificationRequest] = useState<VerificationRequest | null>(null);
    const [signature, setSignature] = useState<File|null>(null); // Add state for the signature
    const signatureRef = React.useRef<SignatureCanvas>(null); // Create a ref for the signature pad
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (userRef.current) userRef.current.focus();
      }, []);
    
      useEffect(() => {
        setValidName(USER_REGEX.test(firstName));
      }, [firstName]);
      useEffect(() => {
        setValidName(USERLASTNAME_REGEX.test(lastName));
      }, [lastName]);
      useEffect(() => {
        setValidName(USER_REGEX.test(userName));
      }, [userName]);
      useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
      }, [email]);
    
      useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
      }, [pwd, matchPwd]);
    
      useEffect(() => {
        setErrMsg('');
      }, [ firstName, lastName,userName, email, pwd, matchPwd,]);
    
      const [customMessage, setCustomMessage] = useState<string | null>(null);

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const v1 = USER_REGEX.test(firstName);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        
        const formData = new FormData(event.currentTarget);
    
        // Convert signature file to Base64 string and append
        if (signature) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = (reader.result as string)?.split(',')[1] as string; // Get the Base64 part
                formData.append('signature', base64String);
    
                try {
                    const response = await registerApi(formData);
                    setAuthResponse(response);
                    setCustomMessage('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        window.location.href = '/login';}, 2000)
    } catch (err:any) {
        console.error(err.response.status, err.response.data);
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
        }
        if (errRef.current) errRef.current.focus();
    }
            };
            reader.readAsDataURL(signature); // Convert file to Base64
        } else {
            try {
                const response = await registerApi(formData);
                setAuthResponse(response);
            } catch (error) {
                setError('Registration failed. Please try again.');
                console.error('Error during registration:', error);
            }
        }
    };
    
 
  

    const handleVerify = async () => {
        try {
            const verify = await verifyCodeApi(email, validationCode);
            setVerificationRequest(verify);
            navigate('/login');
        } catch (error) {
            setError('Verification failed');
            console.error('Error verifying code', error);
        }
    }

    const clearSignature = () => {
        signatureRef.current?.clear();
        setSignature(null);
    }


  const saveSignature = () => {
    if (signatureRef.current) {
        const dataUrl = signatureRef.current.toDataURL();
        // Convert dataUrl to File object or Blob if needed
        // For demonstration, we'll set it as a File
              
        fetch(dataUrl)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'signature.png', { type: blob.type });
                setSignature(file);
            });
            // console.log('this is the signature', signature)
            console.log('this is the dataUrl', dataUrl)
    }
};
  

    useEffect(() => {
        setIsButtonDisabled(validationCode.length !== 6);
    }, [validationCode]);

    useEffect(() => {
        localStorage.setItem('mfaEnabled', mfaEnabled.toString());
    }, [mfaEnabled]);

    return (
        <div className={styles.RegContainer}>
            <section>
                <div className={styles.name}>Create An Account</div>
                <form className={styles.formReg} onSubmit={handleSubmit}>
                    {/* <label>First Name: </label>
                    <input
                        type="text"
                        id='firstname'
                        autoComplete='off'
                        name="firstname"
                        className={styles.inputReg}
                        required
                    />
                    <label>Last Name: </label>
                    <input
                        type="text"
                        id='lastname'
                        autoComplete='off'
                        name="lastname"
                        className={styles.inputReg}
                        required />
                    <label htmlFor="email">Email: </label>
                    <input
                        className="inputReg"
                        type="email"
                        id="email"
                        autoComplete="off"
                        name="email"
                        required
                    />
                    <label htmlFor="userIdentifier">UserName:  </label>
                    <input
                        className="inputReg"
                        type="text"
                        id="userIdentifier"
                        autoComplete="off"
                        name="userIdentifier"
                        placeholder='e.g "zainab (lecturer)"'
                        required
                    />
                    <label htmlFor="password">Password: </label>
                    <input
                        className="inputReg"
                        type="password"
                        id="password"
                        name="password"
                        required
                    /> */}
        
        <div style={{display:"flex",columnGap:"15px", justifyContent:"space-between",width:"100%"}}>
        <div style={{width:"100%"}}> 
        <label htmlFor="firstname" className={styles.regLabel}>
        First Name:
        {userFocus && (
            <>
            <FontAwesomeIcon
                icon={faCheck}
                className={firstName && validName ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
                icon={faTimes}
                className={!firstName && !validName ? styles.invalid : styles.hide}
            />
            </>
        )}
        </label>
        <input
        className={styles.inputReg}
        type="text"
        name='firstName'
        id="firstname"
        ref={firstNameRef}
        autoComplete="off"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        onFocus={() => setUserFocus(true)}
        onBlur={() => setUserFocus(false)}
        required
        />
        </div>
        <div style={{width:"100%"}}>
        <label htmlFor="lastname" className={styles.regLabel}>
        Last Name:
        {lastNameFocus && (
            <>
            <FontAwesomeIcon
                icon={faCheck}
                className={lastName && validName ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
                icon={faTimes}
                className={!lastName && !validName ? styles.invalid : styles.hide}
            />
            </>
        )}
        </label>
        <input
        className={styles.inputReg}
        type="text"
        id="lastname"
        name='lastName'
        ref={lastNameRef}
        autoComplete="off"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        onFocus={() => setLastNameFocus(true)}
        onBlur={() => setLastNameFocus(false)}
        required
        />
        </div>
        </div>
        <div style={{display:"flex",columnGap:"15px", justifyContent:"space-between",width:"100%"}}>
        <div style={{width:"100%"}}>
        <label htmlFor="userIdentifier" className={styles.regLabel}>UserName:  
        {userNameFocus && (
            <>
            <FontAwesomeIcon
                icon={faCheck}
                className={userName && validName ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
                icon={faTimes}
                className={!userName && !validName ? styles.invalid : styles.hide}
            />
            </>
        )}
        </label>
                <input
                    className={styles.inputReg}
                    type="text"
                    id="userIdentifier"
                    autoComplete="off"
                    name="userIdentifier"
                    placeholder='e.g "zainab (lecturer)"'
                    required
                    ref={userNameRef}
                    value={userName}
                    onFocus={() => setUserNameFocus(true)}
                    onBlur={() => setUserNameFocus(false)}
                    onChange={(e) => setUserName(e.target.value)}
                   
                />
            </div>
            <div style={{width:"100%"}}>
        <label htmlFor="email" className={styles.regLabel}>
        Email:
        {emailFocus && (
            <>
            <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? styles.valid : styles.hide}
            />
            <FontAwesomeIcon
                icon={faTimes}
                className={!validEmail ? styles.invalid : styles.hide}
            />
            </>
        )}
        </label>
        <input
        className={styles.inputReg}
        type="email"
        id="email"
        ref={emailRef}
        autoComplete="off"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name='email'
        required
        aria-invalid={!validEmail ? "true" : "false"}
        aria-describedby="emailnote"
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        />
        <p
        id="emailnote"
        className={!validEmail ? styles.instructions : styles.offscreen}
        >
        <FontAwesomeIcon icon={faInfoCircle} />
        Please enter a valid email address.
        </p>
        </div>
        </div>
        <div style={{display:"flex",columnGap:"15px",width:"100%"}}>
        <div style={{width:"100%"}}>
        <label htmlFor="password" className={styles.regLabel}>
        Password:
        <FontAwesomeIcon icon={faCheck} className={validPwd ? styles.valid : styles.hide} />
        <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? styles.hide : styles.invalid} />
        </label>
        <input
        className={styles.inputReg}
        type="password"
        id="password"
        name='password'
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters.<br />
        Must include uppercase and lowercase letters, a number and a special character.<br />
        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
        </p>
    </div>
    <div style={{width:"100%"}}>
        <label htmlFor="confirm_pwd" className={styles.regLabel}>
        Confirm Password:
        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? styles.valid : styles.hide} />
        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? styles.hide : styles.invalid} />
        </label>
        <input
        className={styles.inputReg}
        type="password"
        id="confirm_pwd"
        onChange={(e) => setMatchPwd(e.target.value)}
        value={matchPwd}
        required
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        />
        <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}>
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the first password input field.
        </p>
        </div>
        </div>    
                <div>
                    <div>
                        <input
                            type="checkbox"
                            checked={mfaEnabled}
                            onChange={() => setMfaEnabled(!mfaEnabled)}
                            id="2FA" 
                            className={styles.checkbox}
                            />
                            
                        <label>Enable 2FA (Two factor Authentication) </label>
                    </div>
                    {authResponse && authResponse.mfaEnabled && (
                        <div>
                            <h2>Set Up Two Factor Authentication</h2>
                            <div className={styles.FormGroup}>
                                <img src={authResponse.secretImageUri} alt="QR Code" />
                            </div>
                            <div>
                                <label htmlFor=""> Enter 6 digits validation code generated by the app: </label>
                                <input
                                    type="text"
                                    id='validationCode'
                                    name='validationCode'
                                    value={validationCode}
                                    onChange={(e) => setValidationCode(e.target.value)}
                                    required />
                                <button
                                    type='button'
                                    className={styles.ButtonStyle}
                                    disabled={isButtonDisabled}
                                    onClick={handleVerify}>
                                    Verify code
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.signatureContainer}>
                    <div>Draw Your Signature</div>
                    <div style={{display:"flex", columnGap:"10px"}}>
                    <SignatureCanvas
                        ref={signatureRef}
                        backgroundColor='#c5c5c5'
                        penColor='black'
                        canvasProps={{ width: 500, height: "200px", className: 'sigCanvas' }}
                    />
                    <div>
                    <button type="button" className={styles.clearButton} onClick={clearSignature}>Clear Signature</button>
                    </div>
                    <div>
                    <button type="button" className={styles.signButton} onClick={saveSignature}>Save Signature</button>
                    </div>
                    </div>
                </div>
                <button type="submit">Sign Up</button>
                    <p>
                    Already registered?
                    <span>
                        <Link to="/login">Sign in</Link>
                    </span>
                </p>
                </form>
            </section>
        </div>
    );
}

export default Register;


