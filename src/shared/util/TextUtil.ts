export class TextUtil {
    public static stripCountryCodeFromPhoneNumber(phoneNumber: string): string {
        const trimmedPhoneNumber = phoneNumber.replace(/\D/g, "").slice(-7);
        return trimmedPhoneNumber;
    }

    public static isValidQcellPhoneNumber(phoneNumber: string): boolean {
        const regexp = new RegExp(/^(3|5)\d{6}/);
        return regexp.test(phoneNumber);
    }

    public static generateRandomString(length: number): string {
        var result = "";
        var characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-$_";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }

    public static isValidEmail(email: string): boolean {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(email);
    }
}
