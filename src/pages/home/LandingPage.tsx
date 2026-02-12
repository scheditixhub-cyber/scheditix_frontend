import {NavLink} from "react-router-dom";

const LandingPage = () => {
    return (
        <>
            <div className="w-full h-screen flex items-center justify-center bg-[#E9E7F4] gap-4">
                <NavLink
                    to={"/login"}
                    className="w-max h-12 rounded px-6 bg-purple-300 flex items-center justify-center"
                >
                    Login
                </NavLink>
                <NavLink
                    to={"/signup"}
                    className="w-max h-12 rounded px-6 bg-purple-300 flex items-center justify-center"
                >
                    Signup
                </NavLink>
            </div>
        </>
    );
};

export default LandingPage;
