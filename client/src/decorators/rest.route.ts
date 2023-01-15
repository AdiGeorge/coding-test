import 'reflect-metadata';

export const Post = (path) => {
    /* eslint-disable @typescript-eslint/ban-types */
    return function (target: Object, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        let postPaths = Reflect.getMetadata('post-paths', target);
        if (!postPaths) {
            Reflect.defineMetadata('post-paths', (postPaths = []), target);
        }

        postPaths.push({
            methodName,
            path,
            callback: (...args) => originalMethod(...args),
        });
    };
};

export const Get = (path) => {
    /* eslint-disable @typescript-eslint/ban-types */
    return function (target: Object, methodName: string, descriptor: TypedPropertyDescriptor<any>) {
        const originalMethod = descriptor.value;

        let getPaths = Reflect.getMetadata('get-paths', target);
        if (!getPaths) {
            Reflect.defineMetadata('get-paths', (getPaths = []), target);
        }

        getPaths.push({
            methodName,
            path,
            callback: (...args) => originalMethod(...args),
        });
    };
};
