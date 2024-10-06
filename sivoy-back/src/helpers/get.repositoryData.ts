import { dbConnection } from 'src/config/configORM';
import { Alliance } from 'src/entities/alliances.entity';
import { Blog } from 'src/entities/blogs.entity';
import { Credential } from 'src/entities/credential.entity';
import { Disability } from 'src/entities/disabilities.entity';
import { Donation } from 'src/entities/donation.entity';
import { Faq } from 'src/entities/faq.entity';
import { Image } from 'src/entities/images.entity';
import { Project } from 'src/entities/projects.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { Provider } from 'src/entities/provider.entity';
import { Review } from 'src/entities/review.entity';
import { Suggestion } from 'src/entities/suggestion.entity';
import { Team } from 'src/entities/team.entity';
import { Travel } from 'src/entities/travel.entity';
import { User } from 'src/entities/user.entity';

const repositories = {
  user: dbConnection.getRepository(User),
  travel: dbConnection.getRepository(Travel),
  alliance: dbConnection.getRepository(Alliance),
  blog: dbConnection.getRepository(Blog),
  credential: dbConnection.getRepository(Credential),
  disability: dbConnection.getRepository(Disability),
  donation: dbConnection.getRepository(Donation),
  faq: dbConnection.getRepository(Faq),
  image: dbConnection.getRepository(Image),
  project: dbConnection.getRepository(Project),
  promotion: dbConnection.getRepository(Promotion),
  provider: dbConnection.getRepository(Provider),
  review: dbConnection.getRepository(Review),
  suggestion: dbConnection.getRepository(Suggestion),
  team: dbConnection.getRepository(Team),
};

export const getData = async (entity: string) => {
  const lowerCasedEntity = entity.toLowerCase();

  // Verificamos si la entidad existe en el objeto de repositorios
  if (repositories[lowerCasedEntity]) {
    const repository = repositories[lowerCasedEntity];

    // Si la entidad es 'user', podemos especificar las propiedades a seleccionar
    if (lowerCasedEntity === 'user') {
      return await repository.find({
        select: [
          'createdAt',
          'block',
          'credential',
          'id',
          'name',
          'phone',
          'isRepresentative',
          'role',
        ],
      });
    }

    if (lowerCasedEntity === 'credential') {
      return await repository.find({
        select: ['email', 'avatar', 'id'],
      });
    }

    // Para las demás entidades, simplemente obtenemos todos los datos
    return await repository.find();
  } else {
    throw new Error(`Entity ${entity} not found`);
  }
};
