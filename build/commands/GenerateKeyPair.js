"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
const jose_1 = require("jose");
class GenerateKeyPair extends standalone_1.BaseCommand {
    constructor() {
        super(...arguments);
        this.outputDir = ".jwt";
        this.algorithm = "RS256";
    }
    async run() {
        const { publicKey, privateKey } = await (0, jose_1.generateKeyPair)(this.algorithm);
        this.generator
            .addFile("private", {
            extname: ".pem",
        })
            .stub(await (0, jose_1.exportPKCS8)(privateKey), { raw: true })
            .destinationDir(this.outputDir)
            .appRoot(this.application.cliCwd || this.application.appRoot);
        this.generator
            .addFile("public", {
            extname: ".pem",
        })
            .stub(await (0, jose_1.exportSPKI)(publicKey), { raw: true })
            .destinationDir(this.outputDir)
            .appRoot(this.application.cliCwd || this.application.appRoot);
        await this.generator.run();
    }
}
GenerateKeyPair.commandName = "jwt:generate-keys";
GenerateKeyPair.description = "Generate key pair";
__decorate([
    standalone_1.args.string({ description: "Key pair output dir", required: false }),
    __metadata("design:type", String)
], GenerateKeyPair.prototype, "outputDir", void 0);
__decorate([
    standalone_1.args.string({ description: "Key pair algorithm", required: false }),
    __metadata("design:type", String)
], GenerateKeyPair.prototype, "algorithm", void 0);
exports.default = GenerateKeyPair;
