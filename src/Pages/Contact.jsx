import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { addcontact } from '../Allreducers/contactslice'
import { useDispatch } from 'react-redux'
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loader from '../Common/Loader';

const Contact = () => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const con = async (data) => {

        const mycondata = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message,
        }

        const response = await dispatch(addcontact(mycondata))
        console.log("My Contact response is ", response);
        if (response && response?.type === "addcontact/fulfilled") {
            reset(); // Blank form after submitting data
            setLoading(false)
        }else{
            setLoading(false)
        }

        return response.data;
    };

    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => con(data),
    });


    // Handle On Submit Area
    const onSubmit = (data) => {
        setLoading(true)
        mutation.mutate(data);
    };

    return (
        <>
            <Layout>

                {/* <!-- ======= Contact Section ======= --> */}
                <div class="map-section">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58906.14545488164!2d88.28142013124996!3d22.667427400000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89ce68e7cfa39%3A0xecc5dd803484eae5!2sUttarpara%20Co-operative%20Bank!5e0!3m2!1sen!2sin!4v1712406400333!5m2!1sen!2sin" frameborder="0" style={{ border: '0', width: '100%', height: '350px' }} allowfullscreen></iframe>
                </div>

                <section id="contact" class="contact">
                    <div class="container">

                        <div class="row justify-content-center" data-aos="fade-up">

                            <div class="col-lg-10">

                                <div class="info-wrap">
                                    <div class="row">
                                        <div class="col-lg-4 info">
                                            <i class="icofont-google-map"></i>
                                            <h4>Location:</h4>
                                            <p>15 SC Street<br />Westbengal, 700003</p>
                                        </div>

                                        <div class="col-lg-4 info mt-4 mt-lg-0">
                                            <i class="icofont-envelope"></i>
                                            <h4>Email:</h4>
                                            <p>blog@gmail.com<br />contact@gmail.com</p>
                                        </div>

                                        <div class="col-lg-4 info mt-4 mt-lg-0">
                                            <i class="icofont-phone"></i>
                                            <h4>Call:</h4>
                                            <p>+033-26643827<br />+033-34423657</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div class="row mt-5 justify-content-center" data-aos="fade-up">
                            <div class="col-lg-10">
                                <form action="forms/contact.php" method="post" role="form" class="php-email-form" onSubmit={handleSubmit(onSubmit)}>
                                    <div class="form-row">
                                        <div class="col-md-6 form-group">
                                            <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars"

                                                {...register("name", {
                                                    required: "This field is Required",
                                                    minLength: {
                                                        value: 4,
                                                        message: "Name must be atleast 4 characters"
                                                    }
                                                })}

                                            />
                                            {errors?.name && (
                                                <p style={{ color: 'red' }}>{errors.name.message}</p>
                                            )}
                                        </div>
                                        <div class="col-md-6 form-group">
                                            <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email"

                                                {...register("email", {
                                                    required: "This field is required",
                                                    pattern: {
                                                        value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                        message: "Email Pattern should be xyz@gmail.com",
                                                    },
                                                })}

                                            />
                                            {errors?.email && (
                                                <p style={{ color: 'red' }}>{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" class="form-control" name="phone" id="phone" placeholder="Phone" data-rule="minlen:4" data-msg="Please enter at least 10 chars of phone number"

                                            {...register("phone", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 characters"
                                                },
                                                maxLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 characters"
                                                }
                                            })}

                                        />
                                        {errors?.phone && (
                                            <p style={{ color: 'red' }}>{errors.phone.message}</p>
                                        )}
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"

                                            {...register("message", {
                                                required: "This field is Required",
                                                minLength: {
                                                    value: 4,
                                                    message: "Name must be atleast 4 characters"
                                                }
                                            })}

                                        ></textarea>
                                        {errors?.message && (
                                            <p style={{ color: 'red' }}>{errors.message.message}</p>
                                        )}
                                    </div>
                                    <div class="mb-3">
                                        <div class="loading">Loading</div>
                                        <div class="error-message"></div>
                                        <div class="sent-message">Your message has been sent. Thank you!</div>
                                    </div>
                                    <div class="text-center"><button type="submit">{loading ? <Loader /> : 'Submit'}</button></div>
                                </form>
                            </div>

                        </div>

                    </div>
                </section>
                {/* <!-- End Contact Section --> */}

            </Layout>
        </>
    )
}

export default Contact
