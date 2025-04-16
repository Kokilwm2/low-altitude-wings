console.log('Hello, TypeScript!');

// 示例 TypeScript 代码
interface User {
    name: string;
    age: number;
    isActive: boolean;
}

const user: User = {
    name: "Alice",
    age: 30,
    isActive: true
};

function greet(user: User): string {
    return `Hello, ${user.name}!`;
}

console.log(greet(user));
