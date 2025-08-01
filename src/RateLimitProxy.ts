import { IMessageService } from "./IMessageService";

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  let lastCallTime = 0;

  return new Proxy(service, {
    get(target, prop) {
      if (prop === "send") {
        return function (message: string): void {
          const currentTime = Date.now();

          if (currentTime - lastCallTime < intervalMs) {
            console.log("[RateLimit] skipped");
            return;
          }

          lastCallTime = currentTime;
          return (target[prop] as Function).call(target, message);
        };
      }

      return (target as any)[prop];
    },
  });
}
