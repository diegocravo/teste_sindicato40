import React from "react";
import homeSvg from "../../static/home.svg";
import homeImg from "../../static/homeImg.svg";
import * as db from "../firestore";

function SignIn() {
  return (
    <div>
      <section className="text-gray-500 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={homeImg}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium italic text-white">
              Sindicato 4.0
            </h1>
            <p className="leading-relaxed mb-8 ">
              Sindicato 4.0 é uma plataforma que facilita o gerenciamento do seu sindicato.
            </p>
            <div className="flex justify-center">
              <button
                onClick={db.signInWithGoogle}
                className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Sign In com Google
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
