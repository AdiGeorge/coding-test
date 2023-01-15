import 'reflect-metadata';
import { NextFunction, Router } from 'express';

export const RestController = (controllerPath = '/'): ClassDecorator => {
    return function (target: any) {
        const postPaths = Reflect.getMetadata('post-paths', target.prototype);
        const getPaths = Reflect.getMetadata('get-paths', target.prototype);
        const routes: Router = Router();

        target = class extends (target as { new (...args): any }) {
            constructor(...args) {
                super(...args);
                if ((!postPaths || postPaths.length === 0) && (!getPaths || getPaths.length === 0)) {
                    throw new Error(
                        `Cannot have a RestController if no paths are defined. [${target.constructor.name}]`,
                    );
                }

                if (postPaths) {
                    postPaths.forEach((pathData: any) => {
                        routes.post(pathData.path, (req: Request, res: Response, next: NextFunction) =>
                            this[pathData.methodName](req, res, next),
                        );
                    });
                }

                if (getPaths) {
                    getPaths.forEach((pathData: any) => {
                        routes.get(pathData.path, (req: Request, res: Response, next: NextFunction) =>
                            this[pathData.methodName](req, res, next),
                        );
                    });
                }

                args[0].use(controllerPath, routes);
            }
        };

        return target;
    };
};
