import { IAccountRepo } from "../../repo/IAccountRepo";
import { CreateAccountRequest } from "./CreateAccountRequest";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

let accountRepo: IAccountRepo;
let useCase: CreateAccountUseCase;
describe("CreateAccountUseCase", () => {
    beforeEach(() => {
        accountRepo = jest.createMockFromModule("../../repo/IAccountRepo");
    });

    it("Should fail when email is invalid", async () => {
        let dto: CreateAccountRequest = { email: "ali.njie", name: "Ali" };
        useCase = new CreateAccountUseCase(accountRepo);

        const result = await useCase.execute(dto);
        expect(result.isLeft()).toBeTruthy();
        expect(result.value.getErrorValue()).toBe("Invalid email address.");
    });

    it("Should fail when name is less than minimum acceptable length", async () => {
        let dto: CreateAccountRequest = { email: "ali.@test.com", name: "A" };
        useCase = new CreateAccountUseCase(accountRepo);

        const result = await useCase.execute(dto);
        expect(result.isLeft()).toBeTruthy();
    });
});
