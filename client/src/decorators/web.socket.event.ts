import 'reflect-metadata';

export const WebSocketEvent = (messageKey) => {
    /* eslint-disable @typescript-eslint/ban-types */
    return function (target: Object, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        let subscriptions = Reflect.getMetadata('subscriptions', target);
        if (!subscriptions) {
            Reflect.defineMetadata('subscriptions', (subscriptions = []), target);
        }

        subscriptions.push({
            methodName,
            messageKey,
            callback: (...args) => originalMethod(...args),
        });
    };
};
