describe("Role", () => {
    it("Should fail to create a role if the passed value is not one of the acceptable roles", () => {
        const roleOrError = Role.create("temporary");
        expect(roleOrError.isFailure).toBeTruthy();
    });
});
