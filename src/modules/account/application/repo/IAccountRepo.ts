import { Account } from "../../domain/Account";
import { AccountId } from "../../domain/AccountId";
import { Email } from "../../domain/Email";
import { EmailVerificationToken } from "../../domain/EmailVerificationToken";

export interface IAccountRepo {
    save(account: Account): Promise<void>;
    exist(email: Email): Promise<Boolean>;
    delete(accountId: AccountId): Promise<void>;
    getAccountById(accountId: AccountId): Promise<Account>;
    getAccountByActivationToken(
        token: EmailVerificationToken | string
    ): Promise<Account>;
}
