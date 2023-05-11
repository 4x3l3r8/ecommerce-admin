import React from 'react'

const Modal = ({ show, toggleModal, children }) => {
    return (
        <>
            <div onClick={(e) => toggleModal(false)} className={`fixed ${!show && "hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`} id="my-modal">
                <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal