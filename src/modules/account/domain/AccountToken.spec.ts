import { AccountToken } from "./AccountToken";

describe("UserToken", () => {
    it("Should fail to create when token has length less than 6", () => {
        const userTokenOrError = AccountToken.create("dddd");
        expect(userTokenOrError.isFailure).toBeTruthy();
    });

    it("Should create a new token when an undefined value is passed", () => {
        const userTokenOrError = AccountToken.create();
        expect(userTokenOrError.isSuccess).toBeTruthy();
    });

    it("Should create a new token when a string of length 6 or more is passed", () => {
        const userTokenOrError = AccountToken.create("dddddd");
        expect(userTokenOrError.isSuccess).toBeTruthy();
        expect(userTokenOrError.getValue().value).toEqual("dddddd");
    });
});
