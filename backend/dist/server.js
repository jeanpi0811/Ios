"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = (0, app_1.createApp)();
app.listen(PORT, () => {
    console.log(`CleanOS Pro API rodando na porta ${PORT}`);
});
