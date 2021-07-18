import React from 'react'

function FindProfile() {
    return (
        <div>
            <div className="findprofile-cont">
                <div className="findprofile-email">
                <form action="">
                        <input className="findprofile-email-input" type="email" name="email" placeholder="Enter Email Address" required />
                        <button type="submit" className="findprofile-email-button">Find</button>
                </form>

                </div>
                <div className="findprofile-profile">
                    <div className="findprofile-profile-box">
                        <p>Profile</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindProfile
