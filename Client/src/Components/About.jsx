import React, { useEffect, useState } from "react";
import "../Components/About.css";
import about from "../Assets/about.jpeg";
import { useNavigate } from "react-router-dom";

const About = () => {
  // const navigate = useNavigate();
  const [userData, setuserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      if (!data.status() === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      // navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <section className="about-section">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-lg-12">
              <div className="card p-3 py-4">
                <div className="text-center">
                  <img src={about} width="100" className="rounded-circle" />
                </div>

                <div className="text-center mt-3">
                  <span className="bg-secondary p-1 px-4 rounded text-white">
                    Web developer
                  </span>
                  <h5>Vishal Kumar</h5>
                  <span>vishal.k3102@gmail.com"</span>

                  <div className="px-4 mt-1">
                    <p className="fonts">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quod veritatis modi praesentium animi doloribus molestiae
                      totam et voluptatem velit assumenda.
                    </p>
                  </div>
                  <div className="buttons">
                    <button className="btn btn-outline-primary px-4">
                      Message
                    </button>
                    <button className="btn btn-primary px-4 ms-3">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
