import { EmailVerificationToken } from "./EmailVerificationToken";
import { Email } from "./Email";
import { AccountName } from "./AccountName";
import { Password } from "./Password";
import { AccountToken } from "./AccountToken";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { AccountId } from "./AccountId";
import { Result } from "../../../shared/core/Result";
import { Guard } from "../../../shared/core/Guard";
import { AccountCreated } from "./events/AccountCreated";
import { EmailVerified } from "./events/EmailVerified";
import { AccountLoggedIn } from "./events/AccountLoggedIn";
import { AccountDeleted } from "./events/AccountDeleted";

interface Props {
    name: AccountName;
    email: Email;
    password?: Password;
    token?: AccountToken;
    verified: Boolean;
    verificationToken: EmailVerificationToken;
    active: Boolean;
    dateAdded?: Date;
    lastUpdated?: Date;
}

export class Account extends AggregateRoot<Props> {
    private constructor(props: Props, id?: UniqueEntityID) {
        super(props, id);
    }

    get accountId(): AccountId {
        return AccountId.create(this._id).getValue();
    }

    get name(): AccountName {
        return this.props.name;
    }

    get email(): Email {
        return this.props.email;
    }

    get password(): Password | undefined {
        return this.props.password;
    }

    get authenticationToken(): AccountToken | undefined {
        return this.props.token;
    }

    set token(value: AccountToken) {
        this.props.token = value;
        this.addDomainEvent(new AccountLoggedIn(this));
    }

    get verificationToken(): EmailVerificationToken {
        return this.props.verificationToken;
    }

    get isVerified(): Boolean {
        return this.props.verified;
    }

    set verified(value: Boolean) {
        this.props.verified = value;
        if (value === true) {
            this.addDomainEvent(new EmailVerified(this));
        }
    }

    get isActive(): Boolean {
        return this.props.active;
    }

    set active(value: Boolean) {
        if (value === false) {
            this.addDomainEvent(new AccountDeleted(this));
        }
    }

    get dateAdded(): Date | undefined {
        return this.props.dateAdded;
    }

    get lastUpdate(): Date | undefined {
        return this.props.lastUpdated;
    }

    public static create(props: Props, id?: UniqueEntityID): Result<Account> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
            { argument: props.email, argumentName: "email" },
            { argument: props.verified, argumentName: "verified" },
            {
                argument: props.verificationToken,
                argumentName: "verification token",
            },
            { argument: props.active, argumentName: "active" },
        ]);

        if (nullGuard.isFailure) {
            return Result.fail<Account>(nullGuard.getErrorValue());
        }

        const account = new Account(props, id);
        const isNew = !!id === false;

        if (isNew) {
            account.addDomainEvent(new AccountCreated(account));
        }

        return Result.ok<Account>(account);
    }
}
