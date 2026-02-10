import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginContext } from "../../context/LoginContext";
import LogoutComp from "../../comps/LogoutComp";
const fetch = jest.fn(() => console.log("Mocks a fetch call"));
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
}));
describe("Logout component tests", () => {
    test("matches the snapshot", () => {
        const { asFragment } = render(_jsx(LoginContext.Provider, { value: [true, jest.fn()], children: _jsx(LogoutComp, {}) }));
        expect(asFragment()).toMatchSnapshot();
    });
});
