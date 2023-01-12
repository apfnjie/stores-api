import { UserEmail } from "./UserEmail";

describe("UserEmail", () => {
    it("Should fail to create email if value is ali.njie", () => {
        const userEmailOrError = UserEmail.create("ali.njie");
        expect(userEmailOrError.isFailure).toBeTruthy();
    });

    it("Should create an email address if value is ali.njie@qcell.gm", () => {
        const userEmailOrError = UserEmail.create("ali.njie@qcell.gm");
        expect(userEmailOrError.isSuccess).toBeTruthy();
        expect(userEmailOrError.getValue().value).toBe("ali.njie@qcell.gm");
    });
});
