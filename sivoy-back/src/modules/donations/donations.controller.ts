// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   HttpStatus,
//   Param,
//   Post,
//   Put,
//   Query,
//   Req,
//   Res,
// } from '@nestjs/common';
// import { DonationsService } from './donations.service';
// import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
// import { CreateDonationDto, PaymentNotificationDto } from './donations.dto';
// import { Donation } from 'src/entities/donation.entity';

// @ApiTags('Donations')
// @ApiBearerAuth()
// @Controller('donations')
// export class DonationsController {
//   constructor(private readonly donationsService: DonationsService) {}
  
//   // @Post('webhook')
//   // @ApiResponse({
//   //   status: 200,
//   //   description: 'Payment notification processed successfully.',
//   // })
//   // async handlePaymentWebhook(
//   //   @Body() payload: PaymentNotificationDto,
//   // ): Promise<{ message: string }> {
//   //   console.log('Received payment webhook:', payload);
//   //   return await this.donationsService.processPaymentNotification(payload);
//   // }


//   // 
  


//   @Post('webhook')
// async handleWebhook(
//   @Req() req: Request,
//   @Res() res: Response,
//   @Query('topic') queryTopic: string,
//   @Query('id') queryId: string
// ) {
//   // Capturamos headers y body para registro
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);

//   // Extraemos id y topic ya sea de los query params o del body
//   const payload: PaymentNotificationDto = req.body as unknown as PaymentNotificationDto

//   const id = payload?.data?.donationId;
//   const topic = payload.type;

//   // Verificación de parámetros requeridos
//   if (!topic || !id) {
//     console.error('Faltan parámetros: topic o id');
//     return HttpStatus.BAD_REQUEST
//   }

//   console.log('Topic recibido:', topic);
//   console.log('ID recibido:', id);

//   try {
//       // Procesar la notificación de un pago
//       await this.donationsService.processPaymentNotification(id);
//       console.log('Notificación de pago procesada correctamente');
    
//     // Respondemos con éxito rápidamente
//     return HttpStatus.OK

//   } catch (error) {
//     console.error('Error procesando el webhook:', error.message);
//     return HttpStatus.OK
//   }
// }

  

// @Post('ipn')
// async handleIPN(
//   @Req() req: Request,
//   @Res() res: Response
// ) {
//   console.log('IPN recibido:', req.body);

//   const payload: PaymentNotificationDto = req.body as unknown as PaymentNotificationDto

//   const id = payload?.data?.donationId;
//   const topic = payload.type;

//   // Verificación de parámetros requeridos
//   if (!topic || !id) {
//     console.error('Faltan parámetros en la IPN: id o topic');
//     return HttpStatus.OK
//   }

//   console.log('Topic IPN recibido:', topic);
//   console.log('ID IPN recibido:', id);

//   try {
//     // Procesar según el tipo de topic
//       await this.donationsService.processPaymentNotification(id);
//       console.log('Notificación de pago (IPN) procesada correctamente');

//     // Respuesta rápida
//     return HttpStatus.OK

//   } catch (error) {
//     console.error('Error procesando la IPN:', error.message);
//     return HttpStatus.OK
//   }
// }



//   @Post()
//   @ApiResponse({ status: 201, description: 'Donation created successfully.' })
//   async makeDonation(
//     @Body() createDonationDto: CreateDonationDto, // Usa un DTO para la validación
//   ): Promise<{ status: string; payment_url: string; preference_id: string }> {
//     return await this.donationsService.makeDonation(createDonationDto);
//   }

//   @Get()
//   @ApiResponse({ status: 200, description: 'Retrieved all donations.' })
//   async getAllDonations(): Promise<Donation[]> {
//     return await this.donationsService.getAllDonations();
//   }

//   @Get(':id')
//   @ApiResponse({ status: 200, description: 'Retrieved donation by ID.' })
//   async getDonationById(@Param('id') id: string): Promise<Donation> {
//     return await this.donationsService.getDonationById(id);
//   }

//   @Get('user/:userId')
//   @ApiResponse({ status: 200, description: 'Retrieved donations for user.' })
//   async getDonationsByUser(
//     @Param('userId') userId: string,
//   ): Promise<Donation[]> {
//     return await this.donationsService.getDonationsByUser(userId);
//   }

//   @Post('payment-notification')
//   @ApiResponse({
//     status: 200,
//     description: 'Payment notification processed successfully.',
//   })
//   async handlePaymentWebhook(
//     @Body() payload: PaymentNotificationDto,
//   ): Promise<{ message: string }> {
//     console.log('Received payment webhook:', payload);
//     return await this.donationsService.processPaymentNotification(payload);
//   }
// }




import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateDonationDto, PaymentNotificationDto } from './donations.dto';
import { Donation } from 'src/entities/donation.entity';

@ApiTags('Donations')
@ApiBearerAuth()
@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Res() res: Response,
    @Query('topic') queryTopic: string,
    @Query('id') queryId: string,
  ) {
    // Capturamos headers y body para registro
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    // Extraemos id y topic ya sea de los query params o del body
    const payload: PaymentNotificationDto = req.body as unknown as PaymentNotificationDto;
    const id = queryId || payload?.data?.donationId; // Prioriza el query param, si no está, usa el body
    const topic = queryTopic || payload?.type; // Prioriza el query param, si no está, usa el body

    // Verificación de parámetros requeridos
    if (!topic || !id) {
      console.error('Faltan parámetros: topic o id');
      throw new BadRequestException('Missing required parameters: topic or id');
    }

    console.log('Topic recibido:', topic);
    console.log('ID recibido:', id);

    try {
      // Procesar la notificación de un pago
      await this.donationsService.processPaymentNotification(id);
      console.log('Notificación de pago procesada correctamente');

      // Respondemos con éxito rápidamente
      return HttpStatus.OK
    } catch (error) {
      console.error('Error procesando el webhook:', error.message);
      return HttpStatus.OK
    }
  }

  @Post('ipn')
  async handleIPN(@Req() req: Request, @Res() res: Response) {
    console.log('IPN recibido:', req.body);

    const payload: PaymentNotificationDto = req.body as unknown as PaymentNotificationDto;
    const id = payload?.data?.donationId;
    const topic = payload?.type;

    // Verificación de parámetros requeridos
    if (!topic || !id) {
      console.error('Faltan parámetros en la IPN: id o topic');
      throw new BadRequestException('Missing required parameters: topic or id');
    }

    console.log('Topic IPN recibido:', topic);
    console.log('ID IPN recibido:', id);

    try {
      // Procesar según el tipo de topic
      await this.donationsService.processPaymentNotification(id);
      console.log('Notificación de pago (IPN) procesada correctamente');

      // Respuesta rápida
      return HttpStatus.OK
    } catch (error) {
      console.error('Error procesando la IPN:', error.message);
      return HttpStatus.OK
    }
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Donation created successfully.' })
  async makeDonation(
    @Body() createDonationDto: CreateDonationDto, // Usa un DTO para la validación
  ): Promise<{ status: string; payment_url: string; preference_id: string }> {
    return await this.donationsService.makeDonation(createDonationDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieved all donations.' })
  async getAllDonations(): Promise<Donation[]> {
    return await this.donationsService.getAllDonations();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retrieved donation by ID.' })
  async getDonationById(@Param('id') id: string): Promise<Donation> {
    return await this.donationsService.getDonationById(id);
  }

  @Get('user/:userId')
  @ApiResponse({ status: 200, description: 'Retrieved donations for user.' })
  async getDonationsByUser(@Param('userId') userId: string): Promise<Donation[]> {
    return await this.donationsService.getDonationsByUser(userId);
  }

  @Post('payment-notification')
  @ApiResponse({
    status: 200,
    description: 'Payment notification processed successfully.',
  })
  async handlePaymentWebhook(@Body() payload: PaymentNotificationDto): Promise<{ message: string }> {
    console.log('Received payment webhook:', payload);
    return await this.donationsService.processPaymentNotification(payload);
  }
}
