import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { LoginContext } from "../../context/LoginContext";
import DeleteUserComp from "../../comps/DeleteUserComp";

const renderWithLoginContext = (ui: React.ReactNode) => {
  return render(
    <LoginContext.Provider value={[true, jest.fn()]}>
      {ui}
    </LoginContext.Provider>
  );
};

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

describe("Delete user component", () => {
  test("Mock deleting a user from firebase", async () => {});

  test("Checks if user is not logged in", () => {
    const { getByText } = render(
      <LoginContext.Provider value={[true, jest.fn()]}>
        <DeleteUserComp />
      </LoginContext.Provider>
    );
    expect(getByText(/User is not logged in.../i)).toBeInTheDocument();
  });

  test("matches the snapshot", () => {
    const { asFragment } = render(
      <LoginContext.Provider value={[true, jest.fn()]}>
        <DeleteUserComp />
      </LoginContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
