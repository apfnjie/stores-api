import models from "../models";
import { UniqueEntityID } from "../../../../domain/UniqueEntityID";
import { DomainEvents } from "../../../../domain/events/DomainEvents";

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
    const aggregateId = new UniqueEntityID(model[primaryKeyField]);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
};

(async function createHooksForAggregateRoots() {
    // const { BaseUser } = models;

    // BaseUser.addHook("afterCreate", (m: any) =>
    //     dispatchEventsCallback(m, "base_user_id")
    // );

    console.log("[Hooks]: Sequelize hooks setup.");
})();
