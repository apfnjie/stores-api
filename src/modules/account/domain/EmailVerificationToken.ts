import * as bcrypt from "bcrypt-nodejs";
import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface EmailVerificationTokenProps {
    token: string;
    expiry: Date;
}

export class EmailVerificationToken extends ValueObject<EmailVerificationTokenProps> {
    private static tokenLifeSpan = 6;

    private constructor(props: EmailVerificationTokenProps) {
        super(props);
    }

    get token(): string {
        return this.props.token;
    }

    get expiryDate(): Date {
        return this.props.expiry;
    }

    get tokenIsExpired(): boolean {
        const now = new Date();
        return now > this.props.expiry;
    }

    public static create(rawToken?: string): Result<EmailVerificationToken> {
        if (rawToken) {
            try {
                const props: EmailVerificationTokenProps = JSON.parse(rawToken);
                return Result.ok<EmailVerificationToken>(
                    new EmailVerificationToken({
                        ...props,
                        expiry: new Date(props.expiry),
                    })
                );
            } catch (error) {
                return Result.fail<EmailVerificationToken>(
                    "Invalid email verification token"
                );
            }
        } else {
            const token = bcrypt.hashSync(Date.now().toString());
            const expires = new Date();
            expires.setHours(expires.getHours() + this.tokenLifeSpan);

            return Result.ok<EmailVerificationToken>(
                new EmailVerificationToken({ token, expiry: expires })
            );
        }
    }
}
