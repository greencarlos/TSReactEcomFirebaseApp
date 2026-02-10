import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginContext } from "../../context/LoginContext";
import DeleteUserComp from "../../comps/DeleteUserComp";
const renderWithLoginContext = (ui) => {
    return render(_jsx(LoginContext.Provider, { value: [true, jest.fn()], children: ui }));
};
jest.mock("firebase/auth", () => ({
    getAuth: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
}));
describe("Delete user component", () => {
    test("Mock deleting a user from firebase", async () => { });
    test("Checks if user is not logged in", () => {
        const { getByText } = render(_jsx(LoginContext.Provider, { value: [true, jest.fn()], children: _jsx(DeleteUserComp, {}) }));
        expect(getByText(/User is not logged in.../i)).toBeInTheDocument();
    });
    test("matches the snapshot", () => {
        const { asFragment } = render(_jsx(LoginContext.Provider, { value: [true, jest.fn()], children: _jsx(DeleteUserComp, {}) }));
        expect(asFragment()).toMatchSnapshot();
    });
});
