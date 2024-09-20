import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from "src/entities/provider.entity";

import { Repository } from 'typeorm';

@Injectable()
export class ProvidersRepository {
    constructor(@InjectRepository(Provider) private readonly providersRepository: Repository<Provider>) {}
    
    getAllProviders() {
        return "All Providers"
    }

    getProviderById(id: string) {
        return "Provider by id"
    }

    createProvider() {
        return "Provider Created"
    }

    updateProvider(id: string) {
        return "Provider updated"
    }
}