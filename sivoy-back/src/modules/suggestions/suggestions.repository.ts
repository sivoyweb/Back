import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Suggestion } from "src/entities/suggestion.entity";
import { Repository } from "typeorm";

@Injectable()
    export class SuggestionsRepository {
        constructor(@InjectRepository(Suggestion) private readonly SuggestionsRepository: Repository<Suggestion>) {}

        getAllSuggestions() {
            return "All Suggestions"
        }

        getSuggestionById(id: string) {
            return "Suggestion by id"
        }

        createSuggestion() {
            return "Suggestion Created"
        }

        updateState(id: string) {
            return "Suggestion Updated"
        }
    }