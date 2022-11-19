import { BaseCommand } from "@adonisjs/core/build/standalone";
export default class GenerateKeyPair extends BaseCommand {
    static commandName: string;
    static description: string;
    outputDir: string;
    algorithm: string;
    run(): Promise<void>;
}
