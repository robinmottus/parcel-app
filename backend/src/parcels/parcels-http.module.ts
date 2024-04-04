import { Module } from '@nestjs/common';
import { ParcelsModule } from './parcels.module';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';

@Module({
  imports: [ParcelsModule],
  providers: [ParcelsService],
  controllers: [ParcelsController],
})
export class ParcelsHttpModule {}
