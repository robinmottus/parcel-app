import {
  Body,
  Controller,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Parcel } from './parcel.entity';
import { ParcelsService } from './parcels.service';
import { CreateParcelDto } from './dto/create-parcel.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('/api/parcels')
export class ParcelsController {
  constructor(private readonly parcelsService: ParcelsService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  async findAll(): Promise<Parcel[]> {
    try {
      return await this.parcelsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UseInterceptors(NoFilesInterceptor())
  @Header('Accept', '*/*')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  @Header('Content-Type', '*/*')
  createParcel(@Body() createParcelDto: CreateParcelDto) {
    try {
      return this.parcelsService.createParcel(createParcelDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/filter/:country/:description')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findAllByCountryAndDescriptionFilter(
    @Param('country') country: string,
    @Param('description') description: string,
  ) {
    try {
      return this.parcelsService.filterByCountryAndDescription(
        country,
        description,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/country/:country')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findAllByCountryFilter(@Param('country') country: string) {
    try {
      return this.parcelsService.filterByCountry(country);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/description/:description')
  @Header('Access-Control-Allow-Origin', 'http://localhost:4200')
  findAllByDescriptionFilter(@Param('description') description: string) {
    try {
      return this.parcelsService.filterByDescription(description);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':sku')
  checkForDuplicateSku(@Param('sku') sku: string) {
    try {
      return this.parcelsService.checkForDuplicateSku(sku);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
