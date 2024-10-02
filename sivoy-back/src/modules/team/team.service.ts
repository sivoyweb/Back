import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';

@Injectable()
export class TeamService {
    constructor(private readonly teamRepository: TeamRepository) {}

    getTeam() {
        return this.teamRepository.getTeam();
    }

    getMemberById(id: string, user) {
        return this.teamRepository.getMemberById(id, user);
    }

    addMember(member: CreateTeamDto) {
        return this.teamRepository.addMember(member);
    }

    updateMember(id: string, member: UpdateTeamDto) {
        return this.teamRepository.updateMember(id, member);
    }

    deleteMember(id: string) {
        return this.teamRepository.deleteMember(id);
    }
}
