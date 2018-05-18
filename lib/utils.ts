import * as log from 'great-logs';
import {AppRequest, AppResponse} from './types';

export function handlerDecorator(
  target: Object,
  key: string,
  descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    descriptor.value = (req: AppRequest, res: AppResponse) => {
        try {
          const response = originalMethod(req, res);
          if (response && typeof response.catch === 'function') {
            response.catch((error: string) => {
              log.error(error);
              req.errorFunction(res, 500, req.serverErrorMessage);
            });
          }
          return response;
        } catch(error) {
          log.error(error);
          req.errorFunction(res, 500, req.serverErrorMessage);
        }
        return;
    };
    return descriptor;
}