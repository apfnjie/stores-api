import { Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export class AccountId extends Entity<any> {
    private constructor(id?: UniqueEntityID) {
        super(null, id);
    }

    get id(): UniqueEntityID {
        return this._id;
    }

    public static create(id?: UniqueEntityID): Result<AccountId> {
        return Result.ok<AccountId>(new AccountId(id));
    }
}
