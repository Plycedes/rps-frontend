import React from "react";

const Loader = ({ text, loader = true }) => {
    return (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
            {loader ? (
                <img
                    src="https://gamefundpartners.com/wp-content/uploads/2022/04/loading.gif"
                    alt="loader"
                    className="w-[100px] h-[100px] object-contain"
                />
            ) : (
                <div></div>
            )}
            {text ? (
                <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
                    {text}
                </p>
            ) : (
                <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
                    Transaction is in progress <br /> Please wait...
                </p>
            )}
        </div>
    );
};

export default Loader;

