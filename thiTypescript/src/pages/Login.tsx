import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { signin } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState<any>({
        email: '',
        password: '',
    });
    const [labelErr, setLabelErr] = useState<string>('');

    const handelSignin = (event: any) => {
        event.preventDefault();
        if (dataLogin.email.trim() == '' || dataLogin.password.trim() == '') {
            toast.error('vui lòng nhập đầy đủ email  password');
            return;
        }
        signin(dataLogin)
            .then((data) => {
                console.log(data);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                navigate('/');
            })
            .catch((error) => {
                // toast.error(error?.response?.data?.message);
                setLabelErr(error?.response?.data?.message);
                console.error(error);
            });
    };
    return (
        <div className="" style={{ width: '100vw' }}>
            <Header />

            <div className="form-login">
                <div className="form-wrapper">
                    <form action="#">
                        <h2>Login</h2>
                        <div className="input-field">
                            <input
                                type="text"
                                required
                                value={dataLogin.email}
                                onChange={(e: any) =>
                                    setDataLogin({
                                        ...dataLogin,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <label>Enter your email</label>
                        </div>
                        <div className="input-field">
                            <input
                                type="password"
                                required
                                value={dataLogin.password}
                                onChange={(e: any) =>
                                    setDataLogin({
                                        ...dataLogin,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <label>Enter your password</label>
                        </div>

                        {labelErr ? (
                            <p
                                style={{
                                    color: '#ee4d2d',
                                    fontSize: 14,
                                }}
                            >
                                {labelErr}
                            </p>
                        ) : (
                            ''
                        )}
                        <button type="submit" onClick={(e) => handelSignin(e)}>
                            Log In
                        </button>
                        <div className="register">
                            <p>
                                Don't have an account ?{' '}
                                <Link to={'/register'} style={{ color: 'red', marginLeft: '5px' }}>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </form>

                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '40%',
                                height: '1px',
                                background: '#fff',
                                margin: '20px  0',
                                opacity: '0.6',
                            }}
                        ></div>
                        <div
                            style={{ width: '20%', display: 'flex', justifyContent: 'center', margin: '20px 0 10px 0' }}
                        >
                            <p style={{ color: '#fff' }}>Or</p>
                        </div>
                        <div
                            style={{
                                width: '40%',
                                height: '1px',
                                background: '#fff',
                                margin: '20px 0',
                                opacity: '0.6',
                            }}
                        ></div>{' '}
                    </div>

                    <div
                        className="social"
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <button
                            className="btn-social"
                            style={{
                                color: '#fff',
                                background: 'red',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {' '}
                            <img
                                src="https://mazii.net/assets/imgs/icon/ic_google.png"
                                alt="google"
                                title="google"
                                style={{ height: '100%', width: '20px', marginRight: '10px' }}
                            />{' '}
                            <span>Google</span>
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Login;

// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { signin } from "../api/auth";
// import { Link, useNavigate } from "react-router-dom";
// import Header from "../components/Header/Header";
// import Footer from "../components/footer/Footer";

// const Login = () => {
//   const navigate = useNavigate();
//   const [dataLogin, setDataLogin] = useState<any>({
//     email: "",
//     password: "",
//   });
//   const [labelErr, setLabelErr] =  useState<string>("")

//   const handelSignin = (event: any) => {
//     event.preventDefault();
//     if (dataLogin.email.trim() == "" || dataLogin.password.trim() == "") {
//       toast.error("vui lòng nhập đầy đủ email  password");
//       return;
//     }
//     signin(dataLogin)
//       .then((data) => {
//         console.log(data);
//         localStorage.setItem("user", JSON.stringify(data.data.user));
//         navigate("/");
//       })
//       .catch((error) => {
//         // toast.error(error?.response?.data?.message);
//         setLabelErr(error?.response?.data?.message)
//         console.error(error);
//       });
//   };
//   return (
//     <div>
//       <Header />
//       <div style={{marginTop:'29px'}} className="row mgt-default box-content-default">
//         <div
//           className="no-padding menu-main-user/login col-md-12 col-lg-12 col-xs-12"
//         >
//           <div >
//             <div  className="st-login-screen">
//               <div  className="content-login">
//                 <div  className="st-tile-login cl-tt">

//                 </div>
//                 <div  style={{backgroundColor:'#ccc'}} className="st-main-content">
//                   <div

//                     className="st-grid-left st-height-login bg-content-df"
//                   >
//                     <div  className="st-logo-mazii">
//                     <span
//                     style={{fontWeight:'bold'}}
//                     className="st-tile-content login-system"
//                   >
//                     Log in to your account
//                   </span>
//                       {/* <img

//                         src="assets/imgs/logo/mazii-logo-blue.png"
//                         alt="mazii"
//                         title="Mazii"
//                       /> */}
//                     </div>
//                     <p  className="txt-login cl-content">
//                       Login with external ID:
//                     </p>
//                     <div  className="box-login-fast">
//                       <div

//                         id="google-sign-in-btn"
//                         className="width-gg"
//                       >
//                         <img

//                           src="https://mazii.net/assets/imgs/icon/ic_google.png"
//                           alt="google"
//                           title="google"
//                         />
//                         <p  className="txt-gg">
//                           Google
//                         </p>
//                       </div>
//                       <div

//                         id="apple-sign-in-btn"
//                         className="width-apple"
//                       >
//                         <img

//                           src="https://mazii.net/assets/imgs/icon/ic_apple_white.png"
//                           alt="apple"
//                           title="apple"
//                         />
//                         <p  className="txt-gg">
//                           Apple
//                         </p>
//                       </div>
//                     </div>
//                     <p  className="txt-login cl-content">
//                       or:
//                     </p>
//                     <form
//                       onSubmit={(e) => handelSignin(e)}
//                       className="box-login mgt-20 ng-untouched ng-pristine ng-invalid"
//                     >
//                       <div
//                         className="form-group st-form-group"
//                       >
//                         <img

//                           src="https://mazii.net/assets/imgs/icon/ic_envelope.png"
//                           alt="icon envelope"
//                           title="email"
//                           className="st_icon st-fa-envelope-o"
//                         />
//                         <input
//                            onChange={(e: any) =>
//                             setDataLogin({
//                               ...dataLogin,
//                               email: e.target.value,
//                             })
//                           }
//                           type="text"
//                           name="email"
//                           placeholder="Press email..."
//                           className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
//                         />
//                         {/**/}
//                       </div>
//                       <div

//                         className="form-group st-form-group"
//                       >
//                         <img

//                           src="https://mazii.net/assets/imgs/icon/ic_key.png"
//                           alt="icon key"
//                           title="password"
//                           className="st_icon st-fa-key"
//                         />
//                         <input
//                            onChange={(e: any) =>
//                             setDataLogin({
//                               ...dataLogin,
//                               password: e.target.value,
//                             })
//                           }
//                           type="password"
//                           name="password"
//                           placeholder="Press password..."
//                           className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
//                         />
//                         {
//                             labelErr ?  <p style={{
//                                 color: "#ee4d2d",
//                                 fontSize: 14
//                              }}>{labelErr}</p> :""
//                         }
//                         {/**/}
//                         <p

//                           className="txt-err txt-center same-position"
//                         />
//                       </div>
//                       <div  className="st-login-button">
//                         <button
//                           type="submit"
//                           className="btn-login login st-btn-login"
//                         >
//                           Login
//                         </button>
//                       </div>
//                     </form>
//                     <div  className="box-bottom">
//                       <div  className="st-news-account">
//                         <img

//                           src="https://mazii.net/assets/imgs/icon/ic_plus_circle.png"
//                           alt="icon plus"
//                           title="register"
//                           className="st_icon st-plus-circle"
//                         />
//                         <a  className="st-add-acount cl-blue">
//                         <Link to={'/register'}>Register a new account </Link>
//                         </a>
//                       </div>
//                       <div  className="st-forget-pw">
//                         <a

//                           className="forget-password cl-red forgot"
//                         >

//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                   <div  className="st-grid-right">
//                     <img

//                       src="https://mazii.net/assets/imgs/icon/login.png"
//                       alt="login right"
//                       title="login"
//                       className="st-img-login"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div  className="effect-load">
//                 {/**/}
//               </div>
//             </div>
//             {/**/}
//             <div>
//               <div id="resetPassword" className="modal fade modal-create-df">
//                 <div className="modal-dialog">
//                   <form
//                     noValidate
//                     name="resetPassword"
//                     className="ng-untouched ng-pristine ng-invalid"
//                   >
//                     <div className="modal-content bg-content-df">
//                       <div className="modal-header bd-bt3">
//                         <button
//                           type="button"
//                           aria-label="close"
//                           className="close close-reset-password-modal"
//                         >
//                           <img
//                             src="assets/imgs/icon/ic_close.png"
//                             alt="icon"
//                             title="close"
//                             className="icon"
//                           />
//                         </button>
//                         <div className="modal-title modal-title-df">
//                           Password retrieval
//                         </div>
//                       </div>
//                       <div className="modal-body">
//                         <div className="form-group">
//                           <p className="enter_email">
//                             Please enter the email address used to register for
//                             the account.
//                           </p>
//                           <input
//                             type="email"
//                             name="email"
//                             required
//                             className="form-control bg-input ng-untouched ng-pristine ng-invalid"
//                           />
//                           {/**/}
//                         </div>
//                       </div>
//                       <div className="modal-footer">
//                         <button
//                           type="button"
//                           className="btn btn-default btn-cancel close-reset-password-modal close_modal"
//                         >
//                           Close
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-primary resetPassword btn-create"
//                           disabled
//                         >
//                           {" "}
//                           Send{" "}
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/**/}
//         </div>
//         {/**/}
//         {/**/}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Login;
