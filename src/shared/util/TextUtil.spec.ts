import { TextUtil } from "./TextUtil";

describe("TextUtil", () => {
    describe("stripCountryCodeFromPhoneNumber", () => {
        it("Should return 3343008 when given 2203343008", () => {
            const result =
                TextUtil.stripCountryCodeFromPhoneNumber("2203343008");
            expect(result).toBe("3343008");
        });

        it("Should return 3343008 when given +220 3343008", () => {
            const result =
                TextUtil.stripCountryCodeFromPhoneNumber("2203343008");
            expect(result).toBe("3343008");
        });

        it("Should return 3343008 when given +220 334 3008", () => {
            const result =
                TextUtil.stripCountryCodeFromPhoneNumber("2203343008");
            expect(result).toBe("3343008");
        });
    });

    describe("isValidQcellPhoneNumber", () => {
        it("Should return false when given 3343008", () => {
            const result = TextUtil.isValidQcellPhoneNumber("3343008");
            expect(result).toBe(true);
        });

        it("Should return true when given 5458904", () => {
            const result = TextUtil.isValidQcellPhoneNumber("5458904");
            expect(result).toBe(true);
        });

        it("Should return false when given 344944d", () => {
            const result = TextUtil.isValidQcellPhoneNumber("344944d");
            expect(result).toBe(false);
        });

        it("Should return false when given 544344f", () => {
            const result = TextUtil.isValidQcellPhoneNumber("544344f");
            expect(result).toBe(false);
        });

        it("Should return false when given 7890099", () => {
            const result = TextUtil.isValidQcellPhoneNumber("7890099");
            expect(result).toBe(false);
        });
    });

    describe("generateRandomString", () => {
        it("Should generate a 15 digit random string when given 15", () => {
            const result = TextUtil.generateRandomString(15);
            expect(result.length).toBe(15);
        });

        it("Should generate a 10 digit random string when given 10", () => {
            const result = TextUtil.generateRandomString(10);
            expect(result.length).toBe(10);
        });
    });
});
