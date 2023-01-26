import { Result } from "../../../../../shared/core/Result";
import { UseCaseError } from "../../../../../shared/core/UseCaseError";

export namespace ActivateAccountErrors {
    export class TokenNotFound extends Result<UseCaseError> {
        constructor(token: string) {
            super(false, {
                message: `Account with activation token ${token} not found`,
            } as UseCaseError);
            console.log(
                `[ActivateAccountErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class TokenExpired extends Result<UseCaseError> {
        constructor(token: string) {
            super(false, {
                message: `Token ${token} has expired`,
            } as UseCaseError);
            console.log(
                `[ActivateAccountErrors]: ${this.getErrorValue().message}`
            );
        }
    }

    export class AccountAlreadyVerified extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Account has already been verified/activated`,
            } as UseCaseError);
            console.log(
                `[ActivateAccountErrors]: ${this.getErrorValue().message}`
            );
        }
    }
}
