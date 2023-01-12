import { Email } from "./Email";

describe("Email", () => {
    it("Should fail to create email if value is ali.njie", () => {
        const userEmailOrError = Email.create("ali.njie");
        expect(userEmailOrError.isFailure).toBeTruthy();
        expect(userEmailOrError.getErrorValue()).toBe("Invalid email address.");
    });

    it("Should create an email address if value is ali.njie@qcell.gm", () => {
        const userEmailOrError = Email.create("ali.njie@qcell.gm");
        expect(userEmailOrError.isSuccess).toBeTruthy();
        expect(userEmailOrError.getValue().value).toBe("ali.njie@qcell.gm");
    });
});
