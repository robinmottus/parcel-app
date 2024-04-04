import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcel } from './parcel.entity';
import { CreateParcelDto } from './dto/create-parcel.dto';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  findAll(): Promise<Parcel[]> {
    return this.parcelRepository.find();
  }

  filterByCountryAndDescription(
    country: string,
    description: string,
  ): Promise<Parcel[] | null> {
    return this.parcelRepository.findBy({ country, description });
  }

  filterByDescription(description: string) {
    return this.parcelRepository.findBy({ description });
  }

  filterByCountry(country: string) {
    return this.parcelRepository.findBy({ country });
  }

  async checkForDuplicateSku(sku: string): Promise<boolean> {
    const count = await this.parcelRepository.countBy({ sku });
    return count >= 1;
  }

  createParcel(createParcelDto: CreateParcelDto): Promise<Parcel> {
    const parcel = {
      sku: createParcelDto.sku,
      description: createParcelDto.description,
      address: createParcelDto.address,
      town: createParcelDto.town,
      country: createParcelDto.country,
      date: createParcelDto.date,
    };
    const savedParcel = this.parcelRepository.create(parcel);
    return this.parcelRepository.save(savedParcel);
  }
}
