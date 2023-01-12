import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace CreateAccountErrors {
    export class AccountAlreadyExists extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `Account with email ${email} already exists`,
            } as UseCaseError);
            console.log(
                `[CreateAccountErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
