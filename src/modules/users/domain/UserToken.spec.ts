import { UserToken } from "./UserToken";

describe("UserToken", () => {
    it("Should fail to create when token has length less than 6", () => {
        const userTokenOrError = UserToken.create("dddd");
        expect(userTokenOrError.isFailure).toBeTruthy();
    });

    it("Should create a new token when an undefined value is passed", () => {
        const userTokenOrError = UserToken.create();
        expect(userTokenOrError.isSuccess).toBeTruthy();
    });

    it("Should create a new token when a string of length 6 or more is passed", () => {
        const userTokenOrError = UserToken.create("dddddd");
        expect(userTokenOrError.isSuccess).toBeTruthy();
        expect(userTokenOrError.getValue().value).toEqual("dddddd");
    });
});
