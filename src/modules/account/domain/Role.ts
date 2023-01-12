import { Result } from "../../../shared/core/Result";
import { ValueObject } from "../../../shared/domain/ValueObject";

interface RoleProps {
    value: string;
}

export class Role extends ValueObject<RoleProps> {
    private static acceptableRoles: string[] = ["administrator", "store"];
    private constructor(props: RoleProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    public static create(value: string): Result<Role> {}
}
