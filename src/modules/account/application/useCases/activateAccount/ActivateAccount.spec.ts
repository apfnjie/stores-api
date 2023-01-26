import { Account } from "../../../domain/Account";
import { AccountName } from "../../../domain/AccountName";
import { Email } from "../../../domain/Email";
import { EmailVerificationToken } from "../../../domain/EmailVerificationToken";
import { IAccountRepo } from "../../repo/IAccountRepo";
import { ActivateAccountErrors } from "./ActivateAccountErrors";
import { ActivateAccountRequest } from "./ActivateAccountRequest";
import { ActivateAccountUseCase } from "./ActivateAccountUseCase";

let useCase: ActivateAccountUseCase;
let accountRepo: IAccountRepo;
let dto: ActivateAccountRequest = { token: "fdfklfsffds" };

const unverifiedAccount = Account.create({
    name: AccountName.create("Ali").getValue(),
    email: Email.create("ali@test.com").getValue(),
    verified: false,
    verificationToken: EmailVerificationToken.create({}).getValue(),
    active: true,
}).getValue();

const verifiedAccount = Account.create({
    name: AccountName.create("Ali").getValue(),
    email: Email.create("ali@test.com").getValue(),
    verified: true,
    verificationToken: EmailVerificationToken.create({}).getValue(),
    active: true,
}).getValue();

describe("ActivateAccountUseCase", () => {
    beforeEach(() => {
        accountRepo = jest.createMockFromModule("../../repo/IAccountRepo");
    });

    it("Should fail if activation token is not found", async () => {
        accountRepo.getAccountByActivationToken = jest
            .fn()
            .mockImplementation(async (token: any) => {
                throw new Error("Account not found");
            });
        useCase = new ActivateAccountUseCase(accountRepo);
        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(
            ActivateAccountErrors.TokenNotFound
        );
    });

    it("Account already verified", async () => {
        accountRepo.getAccountByActivationToken = jest
            .fn()
            .mockImplementation(async (token: any) => verifiedAccount);
        useCase = new ActivateAccountUseCase(accountRepo);
        const result = await useCase.execute({ token: "dkfldsfdf" });
        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(
            ActivateAccountErrors.AccountAlreadyVerified
        );
    });

    it("Should activate account", async () => {
        accountRepo.getAccountByActivationToken = jest
            .fn()
            .mockImplementation(async (token: any) => unverifiedAccount);
        accountRepo.save = jest
            .fn()
            .mockImplementation(async (account: any) => void 0);
        useCase = new ActivateAccountUseCase(accountRepo);
        const result = await useCase.execute({ token: "ddfldf" });
        expect(result.isRight()).toBeTruthy();
        expect(accountRepo.getAccountByActivationToken).toHaveBeenCalled();
        expect(accountRepo.save).toHaveBeenCalled();
    });
});
