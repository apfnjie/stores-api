import { EmailVerificationToken } from "./EmailVerificationToken";
import { Email } from "./Email";
import { AccountName } from "./AccountName";
import { Password } from "./Password";
import { AccountToken } from "./AccountToken";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { AccountId } from "./AccountId";

interface Props {
    name: AccountName;
    email: Email;
    password?: Password;
    token?: AccountToken;
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

    get token(): AccountToken | undefined {
        return this.props.token;
    }

    get verificationToken(): EmailVerificationToken {
        return this.props.verificationToken;
    }

    get isActive(): Boolean {
        return this.props.active;
    }

    get dateAdded(): Date | undefined {
        return this.props.dateAdded;
    }

    get lastUpdate(): Date | undefined {
        return this.props.lastUpdated;
    }
}
