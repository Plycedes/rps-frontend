import React from "react";

function ContactUs() {
    return (
        <div className="flex h-screen items-center justify-center rounded-lg">
            <div className="mt-6 border border-purple-500 rounded-lg">
                <div className="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl bg-gray-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] font-[sans-serif] rounded-lg">
                    <div>
                        <h1 className="text-purple-500 text-3xl font-extrabold">Let's Talk</h1>
                        <p className="text-sm text-gray-500 mt-4">
                            Have some big idea or brand to develop and need help? Then reach out
                            we'd love to hear about your project and provide help.
                        </p>

                        <div className="mt-12">
                            <h2 className="text-white text-base font-bold">Email</h2>
                            <ul className="mt-4">
                                <li className="flex items-center">
                                    <div className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=53388&format=png&color=a46ede"
                                            className="w-6 h-6"
                                        />
                                    </div>
                                    <a
                                        href="javascript:void(0)"
                                        className="text-purple-500 text-sm ml-4"
                                    >
                                        <small className="block">Mail</small>
                                        <strong>abhaypratapyadav340@gmail.com</strong>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-white text-base font-bold">Socials</h2>

                            <ul className="flex mt-4 space-x-4">
                                <a
                                    href="https://www.github.com/plycedes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <li className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=12598&format=png&color=a46ede"
                                            className="w-6 h-6"
                                        />
                                    </li>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/abhay-pratap-yadav-9544a522a/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <li className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=447&format=png&color=a46ede"
                                            className="w-6 h-6"
                                        />
                                    </li>
                                </a>
                                <a
                                    href="https://x.com/AbhayPrYadav"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <li className="bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                        <img
                                            src="https://img.icons8.com/?size=100&id=437&format=png&color=a46ede"
                                            className="w-6 h-6"
                                        />
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>

                    <form className="ml-auo space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full text-gray-200 bg-gray-700 rounded-md py-2.5 px-4  text-sm outline-purple-500"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full text-gray-200 bg-gray-700 rounded-md py-2.5 px-4  text-sm outline-purple-500"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            className="w-full text-gray-200 bg-gray-700 rounded-md py-2.5 px-4  text-sm outline-purple-500"
                        />
                        <textarea
                            placeholder="Message"
                            rows="6"
                            className="w-full text-gray-200 bg-gray-700 rounded-md px-4  text-sm pt-2.5 outline-purple-500"
                        ></textarea>
                        <button
                            type="button"
                            className="text-white bg-primary hover:bg-purple-800 rounded-md text-sm px-4 py-3 w-full !mt-6"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
