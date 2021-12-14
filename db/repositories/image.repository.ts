import { Image } from 'db/entities/image.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async findByClientId(clientId: number): Promise<Image[]> {
    return await this.createQueryBuilder('image')
      .innerJoin('image.client', 'client')
      .where(`client.id = ${clientId}`)
      .getMany();
  }
}
