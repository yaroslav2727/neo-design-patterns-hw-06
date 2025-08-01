// Декоратор для додавання timestamp
export function withTimestamp(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (message: string, ...args: any[]) {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace("T", " ");
    const messageWithTimestamp = `[${timestamp}] ${message}`;
    return originalMethod.apply(this, [messageWithTimestamp, ...args]);
  };

  return descriptor;
}

// Декоратор для перетворення в верхній регістр
export function uppercase(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (message: string, ...args: any[]) {
    const uppercaseMessage = message.toUpperCase();
    return originalMethod.apply(this, [uppercaseMessage, ...args]);
  };

  return descriptor;
}
