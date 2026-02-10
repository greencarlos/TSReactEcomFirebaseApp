import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { LoginContext } from "../../context/LoginContext";
import LogoutComp from "../../comps/LogoutComp";

const fetch = jest.fn(() => console.log("Mocks a fetch call"));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}))

describe("Logout component tests", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(
      <LoginContext.Provider value={[true, jest.fn()]}>
        <LogoutComp />
      </LoginContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
