import { UserName } from "./UserName";

describe("UserName", () => {
    it("Should fail if name length is less than minLength", () => {
        const userNameOrError = UserName.create("a");
        expect(userNameOrError.isFailure).toBe(true);
    });

    it("Should create a user name if length of value is more than or equal to minLength", () => {
        const userNameOrError = UserName.create("Ali");
        expect(userNameOrError.isSuccess).toBe(true);
        expect(userNameOrError.getValue().value).toBe("Ali");
    });
});
