import 'reflect-metadata';

export const WebSocketConsumer = (): ClassDecorator => {
    return function (target: any) {
        const subscriptions = Reflect.getMetadata('subscriptions', target.prototype);

        target = class extends (target as { new (...args): any }) {
            constructor(...args) {
                super(...args);
                if (subscriptions.length === 0) {
                    // Cannot have a WebSocketConsumer if no subscriptions are defined.
                    throw new Error(
                        `Cannot have a WebSocketConsumer if no subscriptions are defined. [${target.constructor.name}]`,
                    );
                }

                subscriptions.forEach((subscription: any) => {
                    args[0].on(subscription.messageKey, (payload) => this[subscription.methodName](payload));
                });
            }
        };

        return target;
    };
};
