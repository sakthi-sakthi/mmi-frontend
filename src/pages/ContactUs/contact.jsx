import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../../components/API/Api";


function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [loaderVisible, setLoaderVisible] = useState(false);

  const navigate = useNavigate();

  const onSubmitContactForm = (data, e) => {
    setLoaderVisible(true);

    axios
      .post(`${ApiUrl}/store/contact`, data)
      .then((response) => {
        setLoaderVisible(false);
        if (response.status === 200) {
          Swal.fire(
            "Thank you for contacting us. We will get in touch with you shortly.",
            "",
            "success"
          );
          e.target.reset();
          navigate("/contact-us");
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: err.message,
        });
      });
  };
  return (
    <>
      <div className="container subpage mt-3">
        <div className="row">
          <div className="ecep bs-callout col-lg-6">
            <img src="images/all-img/sj-india-slider.jpg" alt="" />
            <ul>
              <li>
                <i className="fa fa-map-marker"></i>&nbsp;&nbsp;&nbsp;&nbsp;AMMI Generalate Plot No. 167-A, Housing board,
              </li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Defence Enclave, Sardhana Road,</li>
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kankar Khera, Meerut. 250001. U. P.
              </li>
              <li>
                <i className="fa fa-phone"></i>&nbsp;&nbsp;
                <a href="tel:+91 9876543210" style={{ color: "#6b1d2f" }}>
                  +91 9876543210
                </a>
              </li>
              <li>
                <i className="fa fa-envelope"></i>&nbsp;&nbsp;
                <a
                  href="mailto:mmisuperiorgeneral@gmail.com"
                  style={{ color: "#6b1d2f" }}
                >
                  mmisuperiorgeneral@gmail.com
                </a>
              </li>
              <li>
                <i className="fa fa-envelope"></i>&nbsp;&nbsp;
                <a
                  href="mailto:mmisecgen@gmail.com"
                  style={{ color: "#6b1d2f" }}
                >
                  mmisecgen@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 bs-callout">
            <form
              className="php-email-form"
              onSubmit={handleSubmit(onSubmitContactForm)}
            >
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    {...register("name", { required: true })}
                    aria-invalid={errors?.name ? "true" : "false"}
                  />
                  {errors?.name?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">Name is required</label>
                    </div>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    aria-invalid={errors?.email ? "true" : "false"}
                  />
                  {errors?.email?.type === "required" && (
                    <div className="text-danger text_error">
                      <label className="errlabel">Email is required</label>
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Your Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  name="mobile"
                  id="mobile"
                  {...register("mobile", { required: true })}
                  aria-invalid={errors?.mobile ? "true" : "false"}
                />
                {errors?.mobile?.type === "required" && (
                  <div className="text-danger text_error">
                    <label className="errlabel">Mobile is required</label>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  rows={10}
                  defaultValue={""}
                  {...register("message", { required: true })}
                  aria-invalid={errors?.message ? "true" : "false"}
                />
                {errors?.message?.type === "required" && (
                  <div className="text-danger text_error">
                    <label className="errlabel">Message is required</label>
                  </div>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="buttonjs">
                  Send Message
                </button>

                <span
                  id="loader"
                  style={{ display: loaderVisible ? "inline-block" : "none" }}
                >
                  <img
                    src="images/all-img/loader.gif"
                    width="50px"
                    height="50px"
                    alt="Loader"
                  />
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7806.620223972219!2d79.83357600000001!3d11.953018!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53637862fbf235%3A0x1f6fbb2a817b4bf0!2sMMI%20Generalate!5e0!3m2!1sen!2sus!4v1714987976497!5m2!1sen!2sus"
                height={550} style={{ border: 0, width: " 100%" }} allowFullScreen title="st charles" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
