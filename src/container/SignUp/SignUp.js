import React from 'react'
import './Signup.scss'
import login from '../../images/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
const { REACT_APP_API_KEY } = process.env

const SignUp = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    async function createCustomer(datas) {
        const body = {
            "firstname": datas?.firstname,
            "lastname": datas?.lastname,
            "email": datas?.email,
            "phone": datas?.phone,
            "external_id": null
        }

        try {
            const result = await fetch(`https://api.chec.io/v1/customers`, {
                method: "POST",
                headers: {
                    "X-Authorization": REACT_APP_API_KEY,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })

            const response = await result.json();
            return response

        } catch (error) {
            if (!error.response) {
                throw error
            }
        }
    }

    return (
        <div className='signup-wrapper'>
            <div className='container'>
                <div className='signup-content'>
                    <div className='form-wrapper'>
                        <h3>Qeydiyyat</h3>
                        <div className='social-media'>
                            <div className='item'>
                                <div className='image'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1667 2.91667C14.1667 2.68667 13.9792 2.5 13.75 2.5H11.6667C9.365 2.5 7.5 4.17917 7.5 6.25V8.5H5.41667C5.18667 8.5 5 8.68667 5 8.91667V11.0833C5 11.3133 5.18667 11.5 5.41667 11.5H7.5V17.0833C7.5 17.3133 7.68667 17.5 7.91667 17.5H10.4167C10.6458 17.5 10.8333 17.3133 10.8333 17.0833V11.5H13.0158C13.2033 11.5 13.3675 11.375 13.4183 11.195L14.0192 9.02833C14.0933 8.76333 13.8933 8.5 13.6183 8.5H10.8333V6.25C10.8333 5.83583 11.2058 5.5 11.6667 5.5H13.75C13.9792 5.5 14.1667 5.31333 14.1667 5.08333V2.91667Z" fill="white" />
                                    </svg>
                                </div>
                                <span>Facebook il??</span>
                            </div>
                            <div className='item'>
                                <div className='image'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.1667 2.91667C14.1667 2.68667 13.9792 2.5 13.75 2.5H11.6667C9.365 2.5 7.5 4.17917 7.5 6.25V8.5H5.41667C5.18667 8.5 5 8.68667 5 8.91667V11.0833C5 11.3133 5.18667 11.5 5.41667 11.5H7.5V17.0833C7.5 17.3133 7.68667 17.5 7.91667 17.5H10.4167C10.6458 17.5 10.8333 17.3133 10.8333 17.0833V11.5H13.0158C13.2033 11.5 13.3675 11.375 13.4183 11.195L14.0192 9.02833C14.0933 8.76333 13.8933 8.5 13.6183 8.5H10.8333V6.25C10.8333 5.83583 11.2058 5.5 11.6667 5.5H13.75C13.9792 5.5 14.1667 5.31333 14.1667 5.08333V2.91667Z" fill="white" />
                                    </svg>
                                </div>
                                <span>Google il??</span>
                            </div>
                        </div>
                        <p>v?? ya</p>
                        <form onSubmit={handleSubmit((data) => {
                            createCustomer(data)
                            reset()
                            navigate('/login')
                        })}>
                            <div className='input-group'>
                                <label>Ad</label>
                                <input
                                    {...register("firstname", { required: "Ad??n??z qeyd edin" })}
                                    type="text"
                                    placeholder='Ad??n??z?? daxil edin'
                                />
                                {errors.firstname && <span className='alert-message'>{errors.firstname.message}</span>}
                            </div>
                            <div className='input-group'>
                                <label>Soyad</label>
                                <input
                                    {...register("lastname", { required: "Soyad??n??z?? qeyd edin" })}
                                    type="text"
                                    placeholder='Soyad??n??z?? daxil edin'
                                />
                                {errors.lastname && <span className='alert-message'>{errors.lastname.message}</span>}
                            </div>
                            <div className='input-group'>
                                <label>E-mail</label>
                                <input
                                    {...register("email", {
                                        required: "Emailinizi qeyd edin",
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Email d??zg??n qeyd olunmay??b"
                                        }
                                    })}
                                    type="email"
                                    placeholder='n??mun??@gmail.com'
                                />
                                {errors.email && <span className='alert-message'>{errors.email.message}</span>}
                            </div>
                            <div className='input-group'>
                                <label>Mobil n??mr??</label>
                                <InputMask
                                    mask="999 999 99 99"
                                    maskChar={null}
                                    placeholder="050 000 00 00"
                                    {...register("phone", {
                                        required: "N??mr??nizi qeyd edin", minLength: {
                                            value: 13,
                                            message: "N??mr?? d??zg??n qeyd olunmay??b"
                                        }
                                    })}
                                ></InputMask>
                                {errors.phone && <span className='alert-message'>{errors.phone.message}</span>}
                            </div>
                            <div className='input-group checkbox-label'>
                                <input
                                    {...register("terms", { required: "??g??r istifad????i ????rtl??ri il?? raz??s??n??zsa bu xana m??tl??q doldurulmal??d??r." })}
                                    type="checkbox"
                                />
                                <span> ??stifad????i ????rtl??ri il?? raz??yam</span>
                                {errors.terms && <span className='alert-message'>{errors.terms.message}</span>}
                            </div>
                            <button className='main-btn login_btn'>Qeydiyyat</button>
                        </form>
                    </div>
                    <div className='image-wrapper'>
                        <div className='image'>
                            <img src={login} alt="signup" />
                        </div>
                        <p>Art??q hesab??n??z var?  <Link to='/login'>Daxil olun </Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp