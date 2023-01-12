import { left } from "../../../../../shared/core/Either";
import { Result } from "../../../../../shared/core/Result";
import { UseCase } from "../../../../../shared/core/UseCase";
import { Account } from "../../../domain/Account";
import { AccountName } from "../../../domain/AccountName";
import { Email } from "../../../domain/Email";
import { IAccountRepo } from "../../repo/IAccountRepo";
import { CreateAccountErrors } from "./CreateAccountErrors";
import { CreateAccountRequest } from "./CreateAccountRequest";
import { CreateAccountResponse } from "./CreateAccountResponse";

export class CreateAccountUseCase
    implements UseCase<CreateAccountRequest, CreateAccountResponse>
{
    private _accountRepo: IAccountRepo;

    constructor(accountRepo: IAccountRepo) {
        this._accountRepo = accountRepo;
    }

    async execute(
        request: CreateAccountRequest
    ): Promise<CreateAccountResponse> {
        let email: Email;
        let name: AccountName;
        let account: Account;

        const nameOrError = AccountName.create(request.name);
        const emailOrError = Email.create(request.email);
        const dtoResult = Result.combine([nameOrError, emailOrError]);
        if (dtoResult.isFailure) {
            return left(Result.fail<any>(dtoResult.getErrorValue()));
        }

        email = emailOrError.getValue();
        name = nameOrError.getValue();

        const exists = await this._accountRepo.exist(email);
        if (exists) {
            return left(
                new CreateAccountErrors.AccountAlreadyExists(request.email)
            );
        }
        throw new Error("Unimplemented error");
    }
}
