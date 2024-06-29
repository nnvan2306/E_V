import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupData } from "../api/auth";
import Header from "../components/Header/Header";
import Footer from "../components/footer/Footer";

const Resigter = () => {
  const navigate = useNavigate();
  const [dataLogin, setDataLogin] = useState<any>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [labelErr, setLabelErr] =  useState<string>("")
  
  const handelSignin = (event: any) => {
    event.preventDefault();
    if (
      dataLogin.email.trim() == "" ||
      dataLogin.password.trim() == "" ||
      dataLogin.confirmPassword.trim() == "" ||
      dataLogin.name.trim() == ""
    ) {
      toast.error("vui lòng nhập đầy đủ email, password");
      return;
    }
    signupData(dataLogin)
      .then((data) => {
        console.log(data);
        toast.success("Tạo tài khoản thành công , tự động đăng nhập !");
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/");
      })
      .catch((error) => {
        //toast.error(error?.response?.data?.message);
        setLabelErr(error?.response?.data?.message)
        console.error(error);
      });
  };
  return (
    <div>
      <Header />
      <div
        style={{ marginTop: "29px" }}
        className="row mgt-default box-content-default"
      >
        <div className="col-md-12 col-lg-12 col-xs-12 no-padding menu-main-user/register">
          {/**/}
          <div>
            <div className="st-register-screen st-login-screen">
              <div className="content-login">
                <div className="st-tile-login cl-tt"></div>
                <div
                  style={{ backgroundColor: "#ccc" }}
                  className="st-main-content"
                >
                  <div className="st-grid-left st-height-register bg-content-df">
                    <div className="st-logo-mazii">
                      <span
                        style={{ fontWeight: "bold" }}
                        className="st-tile-content register_new"
                      >
                        Register a new account
                      </span>
                      {/* <img
                        src="assets/imgs/logo/mazii-logo-blue.png"
                        alt="mazii"
                        title="Mazii"
                      /> */}
                    </div>
                    <p className="txt-login cl-content">
                      Login with external ID:
                    </p>
                    <div className="box-login-fast">
                      <div id="google-sign-in-btn" className="width-gg">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_google.png"
                          alt="google"
                          title="google"
                        />
                        <p className="txt-gg">Google</p>
                      </div>
                      <div id="apple-sign-in-btn" className="width-apple">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_apple_white.png"
                          alt="apple"
                          title="apple"
                        />
                        <p className="txt-gg">Apple</p>
                      </div>
                    </div>
                    <p className="txt-login cl-content">or:</p>
                    <form
                      noValidate
                      className="box-login mgt-20 ng-untouched ng-pristine ng-invalid"
                    >
                      <div className="form-group st-form-group">
                        <input
                          onChange={(e: any) =>
                            setDataLogin({
                              ...dataLogin,
                              name: e.target.value,
                            })
                          }
                          type="text"
                          name="name"
                          placeholder="Name"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                      </div>
                      <div className="form-group st-form-group">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_envelope.png"
                          alt="icon envelope"
                          title="email"
                          className="st_icon st-fa-envelope-o"
                        />
                        <input
                           onChange={(e: any) =>
                            setDataLogin({
                              ...dataLogin,
                              email: e.target.value,
                            })
                          }
                          type="text"
                          name="email"
                          placeholder="Email"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                      </div>
                      <div className="form-group st-form-group">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_key.png"
                          alt="icon key"
                          title="password"
                          className="st_icon st-fa-key"
                        />
                        <input
                         onChange={(e: any) =>
                          setDataLogin({
                            ...dataLogin,
                            password: e.target.value,
                          })
                        }
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                      </div>
                      <div className="form-group st-form-group">
                        <img
                          src="https://mazii.net/assets/imgs/icon/ic_two_pass.png"
                          alt="pass"
                          title="password"
                          className="st-reconfirm"
                        />
                        <input
                        onChange={(e: any) =>
                          setDataLogin({
                            ...dataLogin,
                            confirmPassword: e.target.value,
                          })
                        }
                          type="password"
                          name="passConfirm"
                          placeholder="Confirm password"
                          className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        {/**/}
                        {
                            labelErr ?  <p style={{ 
                                color: "#ee4d2d",
                                fontSize: 14
                             }}>{labelErr}</p> :""
                        }
                        <p className="txt-center same-position txt-success" />
                      </div>
                    </form>
                    <div className="checkbox">
                      <p className="rule cl-content">
                        <span className="txt-rule-begin">
                          By signing up, I agree to{" "}
                          <a
                            href="/login"
                            target="_blank"
                            rel="noopener"
                            className="txt-rule cl-blue"
                          >
                          Login
                          </a>
                          .
                        </span>
                      </p>
                    </div>
                    
                    <div className="st-btn-register">
                      <button onClick={(e: any) => handelSignin(e)}  type="button" className="st-btn-login btn-login cust-login btn_register">
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="st-grid-right">
                    <img
                      src="https://mazii.net/assets/imgs/icon/regist.png"
                      alt="login right"
                      title="register"
                      className="st-img-regist"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
        </div>
        {/**/}
        {/**/}
      </div>

      <Footer />
    </div>
  );
};

export default Resigter;
