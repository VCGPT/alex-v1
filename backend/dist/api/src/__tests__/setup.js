"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: '.env.test' });
beforeAll(async () => {
    await mongoose_1.default.connect(process.env.MONGODB_URI);
});
afterEach(async () => {
    var _a;
    const collections = await ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.collections());
    if (collections) {
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    }
});
afterAll(async () => {
    await mongoose_1.default.connection.close();
});
//# sourceMappingURL=setup.js.map