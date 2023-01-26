import { AppError } from "../../../../../shared/core/AppError";
import { left, right } from "../../../../../shared/core/Either";
import { Result } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { Account } from "../../../domain/Account";
import { IAccountRepo } from "../../repo/IAccountRepo";
import { ActivateAccountErrors } from "./ActivateAccountErrors";
import { ActivateAccountRequest } from "./ActivateAccountRequest";
import { ActivateAccountResponse } from "./ActivateAccountResponse";

export class ActivateAccountUseCase
    implements UseCase<ActivateAccountRequest, ActivateAccountResponse>
{
    private _accountRepo: IAccountRepo;

    constructor(accountRepo: IAccountRepo) {
        this._accountRepo = accountRepo;
    }

    async execute(
        request: ActivateAccountRequest
    ): Promise<ActivateAccountResponse> {
        let account: Account;

        try {
            try {
                account = await this._accountRepo.getAccountByActivationToken(
                    request.token
                );
            } catch (error) {
                return left(
                    new ActivateAccountErrors.TokenNotFound(request.token)
                );
            }

            if (account.isVerified) {
                return left(new ActivateAccountErrors.AccountAlreadyVerified());
            }

            account.verified = true;

            await this._accountRepo.save(account);
            return right(Result.ok<void>());
        } catch (error: any) {
            return left(new AppError.UnexpectedError(error));
        }
    }
}
