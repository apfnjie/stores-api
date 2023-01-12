import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Account } from "../Account";

export class AccountLoggedIn implements IDomainEvent {
    public dateTimeOccured: Date;
    public account: Account;

    constructor(account: Account) {
        this.dateTimeOccured = new Date();
        this.account = account;
    }

    public getAggregateId(): UniqueEntityID {
        return this.account.id;
    }
}
