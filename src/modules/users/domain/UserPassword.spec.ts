import { UserPassword } from "./UserPassword";

describe("UserPassword", () => {
    it("Should fail to create a password if length is less than 6", () => {
        const userPasswordOrError = UserPassword.create({ value: "test" });
        expect(userPasswordOrError.isFailure).toBeTruthy();
    });

    it("Should create a password if length is equal to or more than 6 chars", () => {
        const userPasswordOrError = UserPassword.create({ value: "test@123" });
        const userPassword = userPasswordOrError.getValue();

        expect(userPasswordOrError.isSuccess).toBeTruthy();
        expect(userPassword.value).toEqual("test@123");
        expect(userPassword.comparePassword("test@123")).toBeTruthy();
        expect(userPassword.isAlreadyHashed()).toBeFalsy();
    });
});
